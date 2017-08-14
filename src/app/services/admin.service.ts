import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { FrontpageService } from './frontpage.service';

@Injectable()
export class AdminService {

  private _url;

  constructor(private _frontpageService: FrontpageService,
                private _http: Http) { 
    this._url = this._frontpageService.getUrl();
  }

  login(username, password) {
    return this._http.post(this._url + '/login', {username, password})
      .map(res => res.json());
  }

  adminInfo() {
    return this._http.get(this._url + '/admin')
      .map(res => res.json());
  }

  contactInfo() {
    return this._http.get(this._url + '/contact')
      .map(res => res.json());
  }

  updateCategory(catId, name) {
    return this._http.post(this._url + '/update/category', { catId, name })
      .map(res => res.json());
  }

  updateSubCategory(subCatId, name) {
    return this._http.post(this._url + '/update/subcategory', { subCatId, name })
      .map(res => res.json());
  }

  updateItem(itemId, name, price, menuOrder) {
    return this._http.post(this._url + '/update/item', { itemId, name, price, menuOrder })
      .map(res => res.json());
  }

  updateContactInfo(contactId, addressOne, addressTwo, number, email) {
    return this._http.post(this._url + '/update/contact', { contactId, addressOne, addressTwo, number, email })
      .map(res => res.json());
  }

  updateFrontPage(frontPageId, main) {
    return this._http.post(this._url + '/update/frontpage', { frontPageId, main })
      .map(res => res.json());
  }

  createCategory(name, navPosition) {
    return this._http.post(this._url + '/create/category', { name, navPosition })
      .map(res => res.json());
  }

  createNewsPost(title, body) {
    return this._http.post(this._url + '/create/newspost', { title, body })
      .map(res => res.json());
  }

}
