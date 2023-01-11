import { SharedModule } from './../../shared/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalistPageComponent } from './components/journalist-page/journalist-page.component';
import { JournalistComponent } from './components/journalist/journalist.component';
import { JournalistsComponent } from './components/journalists/journalists.component';
import { TopJournalistsComponent } from './components/top-journalists/top-journalists.component';



@NgModule({
  declarations: [
    JournalistsComponent,
    JournalistComponent,
    JournalistPageComponent,
    TopJournalistsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],  
  exports: [
    JournalistComponent,
    TopJournalistsComponent,
  ]
})
export class JournalistsModule { }
