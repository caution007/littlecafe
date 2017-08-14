const mongoose = require('mongoose');

var newsPostSchema = new mongoose.Schema ({
  title: String,
  body: String,
  posted: Date
}, {
  versionKey: false
});

var NewsPost = mongoose.model('NewsPost', newsPostSchema);

module.exports = {
    NewsPost: NewsPost
}