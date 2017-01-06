var mongoose = require("mongoose");

var subscriberSchema = new mongoose.Schema({
    personname: String,
    companyname: String,
    startdate: Date,
    enddate: Date,
    street: String,
    streetnumber: Number,
    area: String,
    city: String,
    tk: String,
    responsibleperson: String,
    valid: Boolean,
    
});


module.exports = {Subsciber}