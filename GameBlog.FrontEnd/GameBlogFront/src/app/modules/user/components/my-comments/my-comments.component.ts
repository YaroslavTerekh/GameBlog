import { NewsService } from 'src/app/core/services/news.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/models/post';

@Component({
  selector: 'app-my-comments',
  templateUrl: './my-comments.component.html',
  styleUrls: ['./my-comments.component.scss']
})
export class MyCommentsComponent implements OnInit {

  public posts!: Post[];

  constructor(
    private readonly newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.newsService.getComments()
      .subscribe({
        next: res => {
          this.posts = res;
        }
      });
  }

}
