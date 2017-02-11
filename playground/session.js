var express = require('express');
var session = require('express-session');

var app = express();

// Use the session middleware
app.use(session({ secret: 'keyboard cat',
                  resave: false,
                  saveUninitialized: false,
                  cookie: { maxAge: 600000 }}))

// Access the session as req.session
app.get('/', function(req, res, next) {
  var sess = req.session
  if (sess.views) {
    sess.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + sess.views + '</p>')
    res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
    res.write('<a href="/check">check</a>');
    res.end()
  } else {
    sess.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})

app.get('/check', (req, res)=>{
  var number = req.session.views;
  console.log(number);
  res.send(`${number}`);
});


app.listen(3000);
