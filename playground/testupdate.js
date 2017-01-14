var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");
mongoose.Promise = global.Promise;
var Subsciber = require('../model/subscriber.js');
// var test = new Subsciber({
//     personname: "aaa",
//     companyname: "companyname",
//     startdate: "2001-12-25",
//     enddate: "2012-12-25",
//     street: "agisilaou",
//     streetnumber: 25,
//     area: "omonia",
//     city: "athens",
//     tk: "14552",
//     fee: 60,
//     comment: "comment",
//     responsibleperson: "xiangyu",
//     phone: "6936624325",
//     valid: "True"
// });
//
// test.save().then(test=>{
//     console.log(test);
// }).catch(err=>{
//     console.log(err);
// })

Subsciber.update({_id:"5879f1a72981b063b14e7c03"}, {$set:{valid:true}}, (err, raw)=>{
  if (err) {
    console.log(err);
  }
  console.log(raw);
});
