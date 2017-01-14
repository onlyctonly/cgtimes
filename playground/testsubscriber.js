var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");
mongoose.Promise = global.Promise;
var Subsciber = require('../model/subscriber.js');
var test = new Subsciber({
    personname: "ddd",
    companyname: "companyname",
    startdate: "2001-12-25",
    enddate: "2012-12-25",
    street: "agisilaou",
    streetnumber: 25,
    area: "omonia",
    city: "athens",
    tk: "14552",
    fee: 60,
    comment: "comment",
    responsibleperson: "xiangyu",
    phone: "6936624325",
});

test.save().then(test=>{
    console.log(test);
}).catch(err=>{
    console.log(err);
})
