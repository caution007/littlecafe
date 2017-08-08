const mongoose = require('mongoose');

var dealSchema = new mongoose.Schema ({
  idemId: String,
  menuOrder: Number
}, {
  versionKey: false
});

var Deal = mongoose.model('Deal', dealSchema);

module.exports = {
    Deal: Deal
}