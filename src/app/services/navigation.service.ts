import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { FrontpageService } from './frontpage.service';

@Injectable()
export class NavigationService {

  private _url;

  constructor(private _frontpageService: FrontpageService,
                private _http: Http) {
    this._url = this._frontpageService.getUrl();
  }

  getMenu() {
    return this._http.get(this._url + '/menu')
      .map(res => res.json());
  }

}
