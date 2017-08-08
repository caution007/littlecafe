const express = require('express');
const router = express.Router();
const underscore = require('underscore');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Promise = require('bluebird');
Promise.promisifyAll(mongoose);
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/littlecafe');

var FrontPageInfo = require('./models/frontPageInfoModel').FrontPageInfo;
var Category = require('./models/categoryModel').Category;
var SubCategory = require('./models/subCategorieModel').SubCategory;
var Item = require('./models/itemModel').Item;
var Admin = require('./models/adminModel').Admin;
var Deal = require('./models/dealModel').Deal;

// api listing //
router.get('/', (req, res) => {
  res.send('api works');
});

// GET all front page information //
router.get('/frontpage', (req, res) => {
  FrontPageInfo.findAsync({})
    .then((frontpage) => {
      frontpage = frontpage[0];
      res.json({ 'status': 'success', 'frontpage': frontpage });
    }).catch((e) => {
      res.json({ 'status': 'error', 'error': e });
    })
    .error(console.error);
});

router.get('/menusub/:id', (req, res) => {
  let menu = [];
  SubCategory.findAsync({ 'categoryId': req.params.id })
    .then((subCategories) => {
      let count = 0;
      for(let i = 0; i < subCategories.length; i++) {
        (function(index) {
          let subCategoryObj = subCategories[index].toObject();
          Item.findAsync({ 'subCategoryId': subCategories[index]._id })
            .then((items) => {
              items.sort(sortMenuOrder);
              subCategoryObj.items = items;
              menu.push(subCategoryObj);
              count++;
              if (count > (subCategories.length - 1)) {
                menu.sort(sortMenuOrder);
                res.json({ 'status': 'success', 'menu': menu });
              }
            })
            .catch((e) => {
              res.json({ 'status': 'error', 'error': e });
            })
            .error(console.error);
        }(i))
      }
    })
    .catch((e) => {
      res.json({ 'status': 'error', 'error': e });
    })
    .error(console.error);
})

function sortMenuOrder(a, b) {
  return a.menuOrder - b.menuOrder;
}

router.get('/deals', (req, res) => {
  let dealsFinal = [];
  Deal.findAsync({})
    .then((deals) => {
      console.log(deals);
      let count = 0;
      for(let i = 0; i < deals.length; i++) {
        (function(index) {
          let deal = deals[index].toObject();
          Item.findOneAsync({ '_id': deal.itemId })
            .then((item) => {
              console.log(item);
              item.menuOrder = deals[index].menuOrder;
              dealsFinal.push(item);
              count++;
              if (count > (deals.length - 1)) {
                dealsFinal.sort(sortMenuOrder);
                res.json({ 'status': 'success', 'deals': dealsFinal });
              }
            })
        }(i))
      }
    })
    .catch((e) => {
      res.json({ 'status': 'error', 'error': e });
    })
    .error(console.error);
})

router.get('/menu', (req, res) => {
  let menu = [];

  Category.findAsync({})
    .then((categories) => {
      let count = 0;
      for(let i = 0; i < categories.length; i++) {
        (function(index) {
          let cat = {name: categories[index].name, id: categories[index]._id, navPosition: categories[index].navPosition};
          SubCategory.findAsync({ 'categoryId': categories[index]._id })
            .then((subCategories) => {
              cat.subCategories = subCategories;
              menu.splice(index, 0, cat);
              count++;
              if (count > (categories.length - 1)) {
                menu.sort(function(a, b) {
                    return a.navPosition - b.navPosition;
                });
                res.json({ 'status': 'success', 'menu': menu });
              }
            }).catch((e) => {
              console.log(e);
            })
            .error(console.error);
        }(i))
      }
    })
    .catch((e) => {
      res.json({ 'status': 'error', 'error': e });
    })
    .error(console.error);
})

router.post('/login', (req, res) => {
  console.log(req.body.username);
  Admin.findOneAsync({'username': req.body.username})
    .then((admin) => {
      if(admin.password == req.body.password) {
        res.json({ 'status': 'success' });
      } else {
        res.json({ 'status': 'failed' });
      }
    }).catch((e) => {
      res.json({ 'status': 'error', 'error': e });
    })
    .error(console.error);
})

router.get('/admin', (req, res) => {
  let admin = [];

  Category.findAsync({})
    .then((categories) => {
      let count = 0;
      for(let i = 0; i < categories.length; i++) {
        (function(index) {
          let cat = {name: categories[index].name, id: categories[index]._id, navPosition: categories[index].navPosition};
          SubCategory.findAsync({ 'categoryId': categories[index]._id })
            .then((subCategories) => {
              let count2 = 0;
              for(let y = 0; y < subCategories.length; y++) {
                let subCatLst = [];
                (function(index2) {
                  let subCat = {subCategory: subCategories[index2]}
                  Item.findAsync({'subCategoryId': subCategories[index2]._id})
                    .then((items) => {
                      subCat.items = items;
                      subCatLst.splice(index2, 0, subCat);
                      count2++;
                      if (count2 > (subCategories.length - 1)) {
                        cat.subCategories = subCatLst;
                        admin.splice(index, 0, cat);
                        count++;
                        if (count > (categories.length - 1)) {
                          admin.sort(function(a, b) {
                              return a.navPosition - b.navPosition;
                          });
                          console.log(admin);
                          res.json({ 'status': 'success', 'admin': admin });
                        }
                      }
                    }).catch((e) => {
                      console.log(e);
                    })
                    .error(console.error);
                }(y))
              }
            }).catch((e) => {
              console.log(e);
            })
            .error(console.error);
        }(i))
      }
    }).catch((e) => {
      res.json({ 'status': 'error', 'error': e });
    })
    .error(console.error);
})

module.exports = router;