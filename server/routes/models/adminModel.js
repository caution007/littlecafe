const mongoose = require('mongoose');

var adminSchema = new mongoose.Schema ({
  username: String,
  password: String
}, {
  versionKey: false
});

var Admin = mongoose.model('Admin', adminSchema);

module.exports = {
    Admin: Admin
}