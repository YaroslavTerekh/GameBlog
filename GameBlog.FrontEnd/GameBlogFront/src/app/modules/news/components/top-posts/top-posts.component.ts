import { NewsService } from 'src/app/core/services/news.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/models/post';

@Component({
  selector: 'app-top-posts',
  templateUrl: './top-posts.component.html',
  styleUrls: ['./top-posts.component.scss']
})
export class TopPostsComponent implements OnInit {

  public posts!: Post[];

  constructor(
    private readonly newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.newsService.getNewPosts()
      .subscribe({
        next: res => {
          this.posts = res;
        }
      })
  }

}
