import { ActivatedRoute } from '@angular/router';
import { NewsService } from './../../../../core/services/news.service';
import { Post } from './../../../../shared/models/post';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  public posts!: Post[];
  public id: string = this.route.snapshot.params['id'];

  constructor(
    private readonly newsService: NewsService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {     
    if(this.id != null) {
      this.newsService.getTopicPosts(this.id)
        .subscribe({
          next: res => {
            this.posts = res;
          }
        });
    } else {
      this.newsService.getAllPosts()
        .subscribe({
          next: res => {
            this.posts = res;
          }
        });
    }
  }

}
