import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  private _menu;

  constructor(private _navigationService: NavigationService,
                private _router: Router) { }

  ngOnInit() {
    this._navigationService.getMenu().subscribe(result => {
      this._menu = result.menu;
      console.log(this._menu);
    })
  }

  navToMenu(menuId) {
    this._router.navigate(['/menu', menuId]);
  }

}
