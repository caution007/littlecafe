const mongoose = require('mongoose');

var subCategorySchema = new mongoose.Schema ({
  categoryId: String,
  name: String,
  menuOrder: Number
}, {
  versionKey: false
});

var SubCategory = mongoose.model('SubCategorie', subCategorySchema);

module.exports = {
    SubCategory: SubCategory
}