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

}
