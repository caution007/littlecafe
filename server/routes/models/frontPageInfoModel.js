const mongoose = require('mongoose');

var frontPageInfoSchema = new mongoose.Schema ({
  main: String
}, {
  versionKey: false
});

var FrontPageInfo = mongoose.model('FrontPageInfo', frontPageInfoSchema);

module.exports = {
    FrontPageInfo: FrontPageInfo
}