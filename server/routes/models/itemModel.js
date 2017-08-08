const mongoose = require('mongoose');

var itemSchema = new mongoose.Schema ({
  subCategoryId: String,
  name: String,
  price: Number,
  menuOrder: Number
}, {
  versionKey: false
});

var Item = mongoose.model('Item', itemSchema);

module.exports = {
    Item: Item
}