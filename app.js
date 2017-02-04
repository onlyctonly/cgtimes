var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

// database
mongoose.connect("mongodb://localhost/test");
mongoose.Promise = global.Promise;

//data model
var Subsciber = require('./model/subscriber.js');
var User = require('./model/users');
// express setup

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'cgtimes5678',
                  resave: false,
                  saveUninitialized: false,
                  cookie: { maxAge: 600000 }}));
//验证登录

var authenticate = (req, res, next) => {
  var token = req.session.token;
  if (!token) {
    res.send('not authorised');
  }
  User.findByToken(token).then((user)=>{
    if (!user) {
      res.send('not authorised');
    } else{
      next();
    }
  }).catch((e)=>{
    console.log(e);
  });
};

//login
app.get('/', (req,res)=>{
  res.render('login.ejs');
});
app.post('/login', (req,res)=>{
  var username = req.body.username;
  var password = req.body.password;
  User.findByCredentials(username, password).then((user)=>{
    if (!user) {
      res.send('登录信息错误');
    }
    return user.genAuthToken().then((token)=>{
      req.session.token = token;
      res.redirect('/index');
    })
  }).catch((e)=>{
    res.send(e);
  });
});



//routes
app.get('/index', authenticate, (req, res)=>{
    res.render('index.ejs', {title: "首页"});
});

// 显示所有的订阅客户
app.get('/subscribers', authenticate, (req, res)=>{
  Subsciber.find({valid:true}).sort({personname:1}).exec((err, docs)=>{
    res.render('subscribersAll.ejs', {title: "全部订阅", docs:docs});
  });
});

//编辑订阅客户

app.get('/subscribers/edit/:id', authenticate, (req, res)=>{
  Subsciber.findById(req.params.id).exec((err, doc)=>{
    if (err) {
      console.log(err);
    }
    res.render('subscribersEdit.ejs', {doc:doc});
  });
});

app.post("/subscribers/edit/:id", authenticate, (req,res)=>{
  Subsciber.findByIdAndUpdate(req.params.id, req.body, (err,newdoc)=>{
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
});

// 显示有效订阅客户
app.get('/subscribersvalid', authenticate, (req, res)=>{
  Subsciber.find({valid:true, enddate:{$gt:new Date()}}).sort({personname:1}).exec((err, docs)=>{
    if (docs.length < 1) {
      res.send("无期内订阅客户");
    }
    res.render('subscribersAll.ejs', {title:"期内订阅", docs:docs});
  });
});

//显示失效订阅客户
app.get('/subscribersinvalid', authenticate, (req, res)=>{
  Subsciber.find({valid:true, enddate:{$lt:new Date()}}).sort({personname:1}).exec((err, docs)=>{
    res.render('subscribersAll.ejs', {title: "到期订阅", docs:docs});
  });
});

//显示已删除的订阅客户
app.get('/subscribersdeleted', authenticate, (req, res)=>{
  Subsciber.find({valid: false}).sort({personname:1}).exec((err, docs)=>{
    res.render('subscribersDeleted.ejs', {title: "已删除订阅", docs:docs});
  });
});

//删除无用的订阅客户
app.get('/subscribers/delete/:id', authenticate, (req, res)=>{
  var id = req.params.id;
  Subsciber.update({_id:id}, {$set:{valid:false}}, (err, raw)=>{
    if (err) {
      res.send('record not found');
    }
    res.redirect('back');
  });
});

//恢复已经删除的用户
app.get('/subscribers/recover/:id', authenticate, (req, res)=>{
  var id = req.params.id;
  Subsciber.update({_id:id}, {$set:{valid:true}}, (err, raw)=>{
    if (err) {
      res.send('record not found');
    }
    res.redirect('back');
  });
});

//添加订阅
app.get('/subscribersadd', authenticate, (req,res)=>{
  res.render('subscribersAdd.ejs', {title: "添加订阅客户"});
});
app.post('/subscribers', (req,res)=>{
  var newsubscriber = new Subsciber(req.body);
  newsubscriber.save();
  res.redirect('/');
});

//添加注册用户
app.post('/users', (req, res)=>{
  var username = req.body.username;
  var password = req.body.password;
  console.log(username, password);
  var user = new User({username, password});
  console.log(user);
  user.save().then(()=>{
    return user.genAuthToken();
  }).then((token)=>{
    res.header('x-auth', token).send(user);
  }).catch((e)=>{
    res.send(e);
  });
});
//读取用户资料
app.get('/users/me', authenticate, (req, res)=>{
  res.send(req.user);
})


app.listen(3000, (err)=>{
  if (err) {
    console.log(err);
  }
  console.log('server is running');
});
