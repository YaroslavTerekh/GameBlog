import { NewsService } from 'src/app/core/services/news.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/models/post';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {

  public posts!: Post[];

  constructor(
    private readonly newsService: NewsService
  ) { }

  ngOnInit(): void {
    // todo: GET USER POSTS
  }

}
