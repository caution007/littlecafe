import { Component, OnInit } from '@angular/core';

import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  private _contactInfo;

  constructor(private _contactService: ContactService) { 

   }

  ngOnInit() {
    this._contactService.contactInfo().subscribe(result => {
      this._contactInfo = result.contactInfo;
      console.log(this._contactInfo);
    })
  }

}
