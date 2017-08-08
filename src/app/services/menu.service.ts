import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { FrontpageService } from './frontpage.service';

@Injectable()
export class MenuService {

  private _url;

  constructor(private _frontpageService: FrontpageService,
                private _http: Http) {
    this._url = this._frontpageService.getUrl();
  }

  getMenu(id) {
    return this._http.get(this._url + '/menusub/' + id)
      .map(res => res.json());
  }

}