const mongoose = require('mongoose');

var contactSchema = new mongoose.Schema ({
  addressOne: String,
  addressTwo: String,
  number: String,
  email: String
}, {
  versionKey: false
});

var ContactInfo = mongoose.model('ContactInfo', contactSchema);

module.exports = {
    ContactInfo: ContactInfo
}