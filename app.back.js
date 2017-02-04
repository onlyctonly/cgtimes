var express = require("express");
var bodyParser = require('body-parser');
var session = require("express-session");
var MongoClient = require('mongodb').MongoClient;
//var flash = require('req-flash');
//var cookieParser = require('cookie-parser');
var app = express();


app.set('view engine', "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'superchina',
    cookie: {
	       maxAge: 500*1000,
    },
    resave: true,
    saveUninitialized: true
}));
//app.use(flash());

var url = 'mongodb://localhost:27017/cgtimes';
MongoClient.connect(url, function(err, db) {
    if (err) {
	console.log(err);
    } else {
	console.log(db.collection('employees').find());
	db.close();
    }
});



app.get("/", (req, res)=>{
    //req.flash('successMessage', 'You are successfully using req-flash');
    res.render("login.ejs");
})
app.post("/login", (req,res)=>{
    if (req.body.username === "admin" && req.body.password === "admin") {
	//req.flash('successMessage', 'You are successfully using req-flash');
	req.session.logged = true;
	res.redirect('/secrect');
    } else {
	//req.flash("wrong info");
	res.redirect('/');
    }
})
app.get('/secrect', (req, res) =>{
    if (req.session.logged === true) {
	res.send('shhhhh!');
    } else {
	res.redirect('/');
    }
    
})
app.listen(3000);
