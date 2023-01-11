import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostPageComponent } from './components/post-page/post-page.component';
import { PostsPageComponent } from './components/posts-page/posts-page.component';

const routes: Routes = [
  { path: 'post/:id', component: PostPageComponent },
  { path: 'posts/:id', component: PostsPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
