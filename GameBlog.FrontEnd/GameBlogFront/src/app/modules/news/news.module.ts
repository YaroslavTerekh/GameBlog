import { SharedModule } from './../../shared/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { PostComponent } from './components/post/post.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostsPageComponent } from './components/posts-page/posts-page.component';
import { TopPostsComponent } from './components/top-posts/top-posts.component';


@NgModule({
  declarations: [
    PostComponent,
    PostsComponent,
    PostsPageComponent,
    TopPostsComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    SharedModule
  ],
  exports: [
    PostComponent,
    PostsComponent,
    TopPostsComponent
  ]
})
export class NewsModule { }
