import { NewsModule } from './../news/news.module';
import { JournalistsRoutingModule } from './journalists-routing.module';
import { SharedModule } from './../../shared/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalistPageComponent } from './components/journalist-page/journalist-page.component';
import { JournalistComponent } from './components/journalist/journalist.component';
import { JournalistsComponent } from './components/journalists/journalists.component';
import { TopJournalistsComponent } from './components/top-journalists/top-journalists.component';
import { JournalistInfoPageComponent } from './components/journalist-info-page/journalist-info-page.component';



@NgModule({
  declarations: [
    JournalistsComponent,
    JournalistComponent,
    JournalistPageComponent,
    TopJournalistsComponent,
    JournalistInfoPageComponent,
  ],
  imports: [
    CommonModule,
    JournalistsRoutingModule,
    NewsModule,
    SharedModule
  ],  
  exports: [
    JournalistComponent,
    TopJournalistsComponent,
  ]
})
export class JournalistsModule { }
