const mongoose = require('mongoose');

var categorySchema = new mongoose.Schema ({
  name: String,
  navPosition: Number
}, {
  versionKey: false
});

var Category = mongoose.model('Categorie', categorySchema);

module.exports = {
    Category: Category
}