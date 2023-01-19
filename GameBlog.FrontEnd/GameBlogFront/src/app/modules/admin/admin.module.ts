import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminMainPageComponent } from './components/admin-main-page/admin-main-page.component';
import { UserComponent } from './components/user/user.component';


@NgModule({
  declarations: [
    AdminMainPageComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
