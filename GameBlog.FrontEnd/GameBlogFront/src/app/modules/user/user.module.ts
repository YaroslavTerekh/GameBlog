import { SharedModule } from './../../shared/shared/shared.module';
import { NewsModule } from './../news/news.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MyPostsComponent } from './components/my-posts/my-posts.component';
import { MyCommentsComponent } from './components/my-comments/my-comments.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    MyPostsComponent,
    MyCommentsComponent,
    MyAccountComponent,
    LoginComponent,
    RegisterComponent,
    AddPostComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    NewsModule,
  ],
  exports: [
    MyPostsComponent,
    MyCommentsComponent,
    MyAccountComponent
  ]
})
export class UserModule { }
