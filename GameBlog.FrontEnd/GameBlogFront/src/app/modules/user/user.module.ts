import { NewsModule } from './../news/news.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MyPostsComponent } from './components/my-posts/my-posts.component';
import { MyCommentsComponent } from './components/my-comments/my-comments.component';
import { MyAccountComponent } from './components/my-account/my-account.component';


@NgModule({
  declarations: [
    MyPostsComponent,
    MyCommentsComponent,
    MyAccountComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NewsModule,
  ],
  exports: [
    MyPostsComponent,
    MyCommentsComponent,
    MyAccountComponent
  ]
})
export class UserModule { }
