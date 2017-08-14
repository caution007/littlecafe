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
var ContactInfo = require('./models/contactModel').ContactInfo;
var NewsPost = require('./models/newsPostModel').NewsPost;

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

// GET all news posts //
router.get('/newsposts', (req, res) => {
  NewsPost.findAsync({})
    .then((newsPosts) => {
      res.json({ 'status': 'success', 'newsPosts': newsPosts });
    }).catch((e) => {
      res.json({ 'status': 'error', 'error': e });
    })
    .error(console.error);
});

// GET contact information //
router.get('/contact', (req, res) => {
  ContactInfo.findAsync({})
    .then((contactInfo) => {
      contactInfo = contactInfo[0];
      res.json({ 'status': 'success', 'contactInfo': contactInfo });
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
      //console.log(deals);
      let count = 0;
      for(let i = 0; i < deals.length; i++) {
        (function(index) {
          let deal = deals[index].toObject();
          Item.findOneAsync({ '_id': deal.itemId })
            .then((item) => {
              //console.log(item);
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
              let subCatLst = [];
              
              for(let y = 0; y < subCategories.length; y++) {
                
                (function(index2) {
                  
                  let subCat = {subCategory: subCategories[index2]}
                  Item.findAsync({'subCategoryId': subCategories[index2]._id})
                    .then((items) => {
                      subCat.items = items;
                      
                      subCatLst.splice(index2, 0, subCat);
                      //console.log(index2);
                      //console.log(subCatLst);
                      //console.log("BREAK");
                      count2++;
                      if (count2 > (subCategories.length - 1)) {
                        cat.subCategories = subCatLst;
                        admin.splice(index, 0, cat);
                        count++;
                        if (count > (categories.length - 1)) {
                          admin.sort(function(a, b) {
                              return a.navPosition - b.navPosition;
                          });
                          //console.log(admin[0].subCategories);
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

// CREATES //
router.post('/create/category', (req, res) => {
  let category = new Category({
    name: req.body.name,
    navPosition: req.body.navPosition
  })

  category.saveAsync()
    .then(cat => {
      res.json({ 'status': 'success', 'category': cat });
    })
    .catch((e) => {
      res.json({ 'status': 'error', 'error': e });
    })
    .error(console.error);
}) 

router.post('/create/newspost', (req, res) => {
  let date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
  let newsPost = new NewsPost({
    title: req.body.title,
    body: req.body.body,
    posted: date
  })

  newsPost.saveAsync()
    .then(post => {
      res.json({ 'status': 'success', 'post': post });
    })
    .catch((e) => {
      res.json({ 'status': 'error', 'error': e });
    })
    .error(console.error);
})

// UPDATES // 
router.post('/update/category', (req, res) => {
  Category.findByIdAndUpdateAsync(
    req.body.catId,
    { $set: { name: req.body.name } })
    .then(category => {
      res.json({ 'status': 'success', 'category': category });
    })
    .catch((e) => {
      res.json({ 'status': 'error', 'error': e });
    })
    .error(console.error);
}) 

router.post('/update/subcategory', (req, res) => {
  SubCategory.findByIdAndUpdateAsync(
    req.body.subCatId,
    { $set: { name: req.body.name } })
    .then(subCategory => {
      res.json({ 'status': 'success', 'subCategory': subCategory });
    })
    .catch((e) => {
      res.json({ 'status': 'error', 'error': e });
    })
    .error(console.error);
}) 

router.post('/update/item', (req, res) => {
  var newPrice = parseFloat(req.body.price).toFixed(2);
  Item.findByIdAndUpdateAsync(
    req.body.itemId,
    { $set: { name: req.body.name, price: newPrice, menuOrder: req.body.menuOrder } })
    .then(item => {
      res.json({ 'status': 'success', 'item': item });
    })
    .catch((e) => {
      res.json({ 'status': 'error', 'error': e });
    })
    .error(console.error);
}) 

router.post('/update/contact', (req, res) => {
  console.log(req.body);
  ContactInfo.findByIdAndUpdateAsync(
    req.body.contactId,
    { $set: 
      { 
        addressOne: req.body.addressOne,
        addressTwo: req.body.addressTwo,
        number: req.body.number,
        email: req.body.email
      } })
    .then(contact => {
      res.json({ 'status': 'success', 'contact': contact });
    })
    .catch((e) => {
      res.json({ 'status': 'error', 'error': e });
    })
    .error(console.error);
}) 

router.post('/update/frontpage', (req, res) => {
  console.log(req.body);
  FrontPageInfo.findByIdAndUpdateAsync(
    req.body.frontPageId,
    { $set: { main: req.body.main } })
    .then(frontPage => {
      res.json({ 'status': 'success', 'frontPage': frontPage });
    })
    .catch((e) => {
      res.json({ 'status': 'error', 'error': e });
    })
    .error(console.error);
})

router.post('/update/newsposts', (req, res) => {
  console.log(req.body);
  NewsPost.findByIdAndUpdateAsync(
    req.body.postId,
    { $set: 
      { 
        title: req.body.title,
        body: req.body.body
      } 
    })
    .then(newsPost => {
      res.json({ 'status': 'success', 'newsPost': newsPost });
    })
    .catch((e) => {
      res.json({ 'status': 'error', 'error': e });
    })
    .error(console.error);
})

module.exports = router;