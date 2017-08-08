import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private _paramID;
  private _menu;

  constructor(private _activatedRoute: ActivatedRoute,
                private _matchService: MenuService) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params: Params) => {
      this._paramID = params['id'];

      this._matchService.getMenu(this._paramID).subscribe(result => {
        this._menu = result.menu;
        console.log(this._menu);
      })
    })

    
  }

}
