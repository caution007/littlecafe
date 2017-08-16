import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-editnewspost',
  templateUrl: './editnewspost.component.html',
  styleUrls: ['./editnewspost.component.css']
})
export class EditnewspostComponent implements OnInit {

  private _paramID;
  private _newsPost;

  // Subscriptions //
  private _updateNewsPostSub;

  constructor(private _adminService: AdminService,
                private _activatedRoute: ActivatedRoute,
                  private _router: Router) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params: Params) => {
      this._paramID = params['id'];

      this._adminService.getNewsPost(this._paramID).subscribe(result => {
        this._newsPost = result.newsPost;
        console.log(this._newsPost);
      })
    })
  }

  updateNewsPost() {
    this._updateNewsPostSub = this._adminService.updateNewsPost(this._newsPost._id, this._newsPost.title, this._newsPost.body).subscribe(result => {
      if (result.status == 'success') {
        this._updateNewsPostSub.unsubscribe();
        this.navToFrontPage();
      }
    })
  }
  
  navToFrontPage() {
    this._router.navigate(['/frontpage']);
  }
}
