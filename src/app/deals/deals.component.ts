import { Component, OnInit } from '@angular/core';

import { DealsService } from '../services/deals.service';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent implements OnInit {

  private _deals;

  constructor(private _dealsService: DealsService) { }

  ngOnInit() {
    this._dealsService.getDeals().subscribe(result => {
      this._deals = result.deals;
      console.log(this._deals);
    })
  }

}
