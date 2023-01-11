import { JournalistsModule } from 'src/app/modules/journalists/journalists.module';
import { TopicsModule } from './../../modules/topics/topics.module';
import { NewsModule } from './../../modules/news/news.module';
import { AppRoutingModule } from './../../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    AppRoutingModule,
  ]
})
export class SharedModule { }
