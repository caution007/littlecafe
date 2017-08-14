import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { FrontpageService } from './frontpage.service';

@Injectable()
export class ContactService {

  private _url;

  constructor(private _frontpageService: FrontpageService,
                private _http: Http) { 
    this._url = this._frontpageService.getUrl();
  }

  contactInfo() {
    return this._http.get(this._url + '/contact')
      .map(res => res.json());
  }

}
