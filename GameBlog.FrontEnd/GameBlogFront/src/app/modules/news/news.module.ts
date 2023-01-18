import { TrimTextForPostPipe } from './../../core/pipes/trim-text-for-post.pipe';
import { PostPageComponent } from './components/post-page/post-page.component';
import { SharedModule } from './../../shared/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { PostComponent } from './components/post/post.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostsPageComponent } from './components/posts-page/posts-page.component';
import { TopPostsComponent } from './components/top-posts/top-posts.component';
import { PostCommentComponent } from './components/post-comment/post-comment.component';


@NgModule({
  declarations: [
    PostComponent,
    PostsComponent,
    PostsPageComponent,
    TopPostsComponent,
    PostCommentComponent,
    PostPageComponent,
    TrimTextForPostPipe
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    SharedModule,
    
  ],
  exports: [
    NewsRoutingModule,
    PostComponent,
    PostsComponent,
    TopPostsComponent,
    PostCommentComponent
  ]
})
export class NewsModule { }
