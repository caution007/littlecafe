import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { FrontpageService } from './frontpage.service';

@Injectable()
export class DealsService {

  private _url;

  constructor(private _frontpageService: FrontpageService,
                private _http: Http) {
    this._url = this._frontpageService.getUrl();
  }

  getDeals() {
    return this._http.get(this._url + '/deals')
      .map(res => res.json());
  }

}