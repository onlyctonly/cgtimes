var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');


var userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true, minlength: 6},
  tokens: [{
    access: {type: String, required: true},
    token: {type: String, requried: true}
  }]
});

userSchema.statics.findByToken = function(token){
  var User = this;
  var decoded;
  try {
    decoded = jwt.verify(token, 'cgtimes');
  } catch (e) {
    return Promise.reject();
  }
  return User.findOne({'_id': decoded._id, 'tokens.access': 'auth', 'tokens.token': token});
};

userSchema.methods.genAuthToken = function () {
  var user=this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'cgtimes').toString();
  user.tokens=[];
  user.tokens.push({access, token});
  return user.save().then(()=>{return token});
};

userSchema.statics.findByCredentials = function (username, password) {
  var User=this;
  return User.findOne({username}).then((user)=>{
    if (!user) {
      return Promise.reject();
    }
    return new Promise((resolve, reject)=>{
      bcrypt.compare(password, user.password, (err, res)=>{
        if (res) {
          resolve(user);
        } else {
          reject("登录信息错误！");
        }
      });
    });
  });



  return User.findOne({username, password});
};

var User = mongoose.model('User', userSchema);




module.exports = User;
