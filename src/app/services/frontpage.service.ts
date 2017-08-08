import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FrontpageService {

  private _url = 'http://localhost:3000/api';

  constructor(private _http: Http) { }

  getFrontPageInfo() {
    return this._http.get(this._url + '/frontpage')
      .map(res => res.json());
  }

  getUrl() {
    return this._url;
  }
}
