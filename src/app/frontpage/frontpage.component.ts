import { Component, OnInit } from '@angular/core';
import { Auth } from '../auth/auth.service';

import { FrontpageService } from '../services/frontpage.service';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {

  private _frontPage;

  constructor(private _frontPageService: FrontpageService,
                private _auth: Auth) { }

  ngOnInit() {
    this._frontPageService.getFrontPageInfo().subscribe(frontpage => {
      this._frontPage = frontpage.frontpage;
    })
  }

}
