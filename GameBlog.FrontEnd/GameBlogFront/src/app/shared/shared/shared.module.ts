import { JournalistsModule } from 'src/app/modules/journalists/journalists.module';
import { TopicsModule } from './../../modules/topics/topics.module';
import { NewsModule } from './../../modules/news/news.module';
import { AppRoutingModule } from './../../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
