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
    country: String,
    fee: Number,
    comment: String,
    responsibleperson: String,
    phone: String,
    valid: {type:Boolean, default: true}
});

var Subsciber = mongoose.model('Subsciber', subscriberSchema);

module.exports = Subsciber;
