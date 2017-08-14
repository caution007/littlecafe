import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DealsComponent } from './deals/deals.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { ContactComponent } from './contact/contact.component';
import { MenuComponent } from './menu/menu.component';

import { FrontpageService } from './services/frontpage.service';
import { NavigationService } from './services/navigation.service';
import { AdminService } from './services/admin.service';
import { MenuService } from './services/menu.service';
import { DealsService } from './services/deals.service';
import { ContactService } from './services/contact.service';
import { Auth } from './auth/auth.service';


import { AppRoutingModule } from './app-routing.module';
import { AdminComponent } from './admin/admin.component';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';
import { AdminitemComponent } from './admin/adminitem/adminitem.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
          tokenGetter: (() => localStorage.getItem('token')),
          globalHeaders: [{'Content-Type':'application/json'}],
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DealsComponent,
    FrontpageComponent,
    ContactComponent,
    MenuComponent,
    AdminComponent,
    AdminloginComponent,
    AdminitemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    FrontpageService,
    NavigationService,
    AdminService,
    MenuService,
    DealsService,
    ContactService,
    Auth,
    AuthGuard,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
