import { Component, OnInit, OnDestroy } from '@angular/core';
import { Auth } from '../auth/auth.service';
import { Router } from '@angular/router';

import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  private _adminInformation;
  private _user;
  constructor(private _auth: Auth,
                private _adminService: AdminService) { }

  ngOnInit() {
    this._user = JSON.parse(localStorage.getItem('profile'));
    console.log(this._user);
    this._adminService.adminInfo().subscribe(result => {
      console.log(result);
      this._adminInformation = result.admin;
    })
  }

  ngOnDestroy() {
    
  }

}
