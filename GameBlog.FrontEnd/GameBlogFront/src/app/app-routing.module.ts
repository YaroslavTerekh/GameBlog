import { MyCommentsComponent } from './modules/user/components/my-comments/my-comments.component';
import { TopicsPageComponent } from './modules/topics/components/topics-page/topics-page.component';
import { PostsPageComponent } from './modules/news/components/posts-page/posts-page.component';
import { JournalistPageComponent } from './modules/journalists/components/journalist-page/journalist-page.component';
import { MainComponent } from './modules/main/components/main/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyAccountComponent } from './modules/user/components/my-account/my-account.component';
import { MyPostsComponent } from './modules/user/components/my-posts/my-posts.component';
import { AddPostComponent } from './modules/user/components/add-post/add-post.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'journalists', component: JournalistPageComponent },
  { path: 'news', component: PostsPageComponent },
  { path: 'topics', component: TopicsPageComponent },
  { path: 'myaccount', component: MyAccountComponent },
  { path: 'mycomments', component: MyCommentsComponent },
  { path: 'myposts', component: MyPostsComponent },
  { path: 'add-post', component: AddPostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
