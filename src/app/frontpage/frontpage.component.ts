import { Component, OnInit } from '@angular/core';
import { Auth } from '../auth/auth.service';
import * as moment from 'moment';

import { FrontpageService } from '../services/frontpage.service';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {

  private _frontPage;
  private _newsPosts;

  constructor(private _frontPageService: FrontpageService,
                private _auth: Auth) { }

  ngOnInit() {

    this._frontPageService.getFrontPageInfo().subscribe(frontpage => {
      this._frontPage = frontpage.frontpage;
    })
    
    this._frontPageService.getNewsPosts().subscribe(result => {
      this._newsPosts = result.newsPosts;

      for(let i = 0; i < this._newsPosts.length; i++) {
        this._newsPosts[i].posted = moment(this._newsPosts[i].posted).format('MMMM Do YYYY').toString();
      }

      console.log(this._newsPosts);
    })
  }

}
