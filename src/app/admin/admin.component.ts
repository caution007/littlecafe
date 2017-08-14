import { Component, OnInit, OnDestroy } from '@angular/core';
import { Auth } from '../auth/auth.service';
import { Router } from '@angular/router';

import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  private _adminInformation;
  private _contactInformation;
  private _user;

  private _currentCategory;
  private _currentSubCat;
  private _currentItem;

  private _categoriesCheck = false;
  private _subCatCheck = false;
  private _itemCheck = false;

  private _menuItemName = 'Choose';
  private _categoriesName = 'Choose';
  private _itemsName = 'Choose';

  private _editCategoryCheck = false;
  private _editSubCategoryCheck = false;
  private _editItemCheck = false;
  private _createCategoryCheck = false;
  private _createSubCategoryCheck = false;
  private _createItemCheck = false;

  // For edit forms //
  private _category;
  private _subCategory;
  private _item;

  // Subscriptions //
  private _updateCatSub;
  private _updateSubCatSub;
  private _updateItemSub;
  private _updateContactInfoSub;

  private _createCatSub;
  private _createSubCatSub;
  private _createItemSub;

  // Create //
  // Category //
  private _categoryName;

  // Sub Category //
  private _subCategoryName;

  // Item //
  private _itemName;
  private _itemPrice;
  private _itemMenuOrder;

  constructor(private _auth: Auth,
                private _adminService: AdminService) { }

  ngOnInit() {
    this._user = JSON.parse(localStorage.getItem('profile'));
    console.log(this._user);
    this._adminService.adminInfo().subscribe(result => {
      console.log(result);
      this._adminInformation = result.admin;
    })

    this._adminService.contactInfo().subscribe(result => {
      console.log(result);
      this._contactInformation = result.contactInfo;
    })
  }

  ngOnDestroy() {
    
  }

  setCategories(category, name) {
    this._menuItemName = name;
    this._categoriesName = 'Choose';
    this._subCatCheck = false;
    this._currentCategory = category;
    this._categoriesCheck = true;
    this.setChecksToFalse();
  }

  setItems(subCat, name) {
    this._categoriesName = name;
    this._itemCheck = false;
    this._itemsName = 'Choose';
    this._currentSubCat = subCat;
    this._subCatCheck = true;
    this.setChecksToFalse();
  }

  clickItem(item, name) {
    this._itemsName = name;
    this._itemCheck = true;
    this._currentItem = item;
    console.log(this._currentItem);
    this.setChecksToFalse();
  }

  editMenuCheck(check) {
    this.setChecksToFalse();
    switch (check) {
      case 0:
        this._editCategoryCheck = true;
        this._category = this._adminInformation[this._currentCategory];
        console.log(this._category);
        break;
        
      case 1:
        this._editSubCategoryCheck = true;
        this._subCategory = this._adminInformation[this._currentCategory].subCategories[this._currentSubCat];
        console.log(this._subCategory);
        break;

      case 2:
        this._editItemCheck = true
        this._item = this._adminInformation[this._currentCategory].subCategories[this._currentSubCat].items[this._currentItem];
        console.log(this._item);
        break;

      case 3:
        this._createCategoryCheck = true;
        break;
      
      case 4:
        this._createSubCategoryCheck = true;
        break;

      case 5:
        this._createItemCheck = true;
        break;
    }
  }

  setChecksToFalse() {
    this._editCategoryCheck = false;
    this._editCategoryCheck = false;
    this._editItemCheck = false
    this._createCategoryCheck = false;
    this._createSubCategoryCheck = false;
    this._createItemCheck = false;
  }

  updateCategory() {
    this._updateCatSub = this._adminService.updateCategory(this._category.id, this._category.name).subscribe(result => {
      if (result.status == 'success') {
        this._updateCatSub.unsubscribe();
      }
    })
  }

  updateSubCategory() {
    this._updateSubCatSub = this._adminService.updateSubCategory(this._subCategory.subCategory._id, this._subCategory.subCategory.name).subscribe(result => {
      if (result.status == 'success') {
        this._updateSubCatSub.unsubscribe();
      }
    })
  }

  updateItem() {
    this._updateItemSub = this._adminService.updateItem(this._item._id, this._item.name, this._item.price, this._item.menuOrder).subscribe(result => {
      if (result.status == 'success') {
        this._updateItemSub.unsubscribe();
      }
    })
  }

  updateContactInfo() {
    this._updateContactInfoSub = this._adminService.updateContactInfo(
      this._contactInformation._id,
      this._contactInformation.addressOne, 
      this._contactInformation.addressTwo, 
      this._contactInformation.number, 
      this._contactInformation.email).subscribe(result => {
        if (result.status == 'success') {
          this._updateContactInfoSub.unsubscribe();
      }
    })
  }

  createCategory() {
    var navPosition = (this._adminInformation.length + 1);
    this._createCatSub = this._adminService.createCategory(this._categoryName, navPosition).subscribe(result => {
      if (result.status == 'success') {
        this._createCatSub.unsubscribe();
      }
    })
  }

}
