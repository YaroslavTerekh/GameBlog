import { NewsModule } from './../news/news.module';
import { SharedModule } from './../../shared/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicsRoutingModule } from './topics-routing.module';
import { TopicComponent } from './components/topic/topic.component';
import { TopicsComponent } from './components/topics/topics.component';
import { TopicsPageComponent } from './components/topics-page/topics-page.component';


@NgModule({
  declarations: [
    TopicComponent,
    TopicsComponent,
    TopicsPageComponent
  ],
  imports: [
    CommonModule,
    TopicsRoutingModule,
    NewsModule,
    SharedModule
  ],
  exports: [
    TopicComponent,
    TopicsComponent,
    TopicsPageComponent,
  ]
})
export class TopicsModule { }
