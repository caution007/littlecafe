import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../auth/auth.service';

import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  private _username;
  private _password;
  private _user;
  private _loginResult;

  constructor(private _adminService: AdminService,
                private _router: Router,
                  private _auth: Auth) { }

  ngOnInit() {
    this._user = JSON.parse(localStorage.getItem('profile'));
    //console.log(this._user);
  }

  private checkAuth() {
    console.log(this._auth.authenticated());
  }

}
