import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FrontpageComponent } from './frontpage/frontpage.component';
import { MenuComponent } from './menu/menu.component';
import { AdminComponent } from './admin/admin.component';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';
import { EditnewspostComponent } from './admin/editnewspost/editnewspost.component';
import { ContactComponent } from './contact/contact.component';

import { AuthGuard } from './auth/auth.guard';


//{ path: "profile", component: ProfileComponent, canActivate: [AuthGuard] }
const routes: Routes = [
    { path: "", redirectTo: '/frontpage', pathMatch: 'full' },
    { path: "frontpage", component: FrontpageComponent },
    { path: "menu/:id", component: MenuComponent },
    { path: "contact", component: ContactComponent },
    { path: "editnewspost/:id", component: EditnewspostComponent, canActivate: [AuthGuard] },
    { path: "admin", component: AdminComponent, canActivate: [AuthGuard] },
    { path: "adminlogin", component: AdminloginComponent },
    //{ path: "404", component: NotfoundComponent },
    { path: "**", redirectTo: '/404' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}