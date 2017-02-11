var bcrypt = require('bcryptjs');

var hash;
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash("password123!", salt, function(err, hash) {
      hash = hash;
      console.log(hash);
    });
});
console.log(hash);
bcrypt.compare("password123!", "$2a$10$FjlByC.v5/HSufRJ0QAiWO.UHnK1.yKHqGaBmNrPdOlJKno.hPB.C").then((res) => {
    console.log(res);
});
