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
    country: String,
    postcode: String,
    fee: Number,
    comment: String,
    responsibleperson: String,
    phone: String,
    valid: Boolean
    
});

var Subsciber = mongoose.model('Subsciber', subscriberSchema);

module.exports = Subsciber;