import { Post } from './../../../../shared/models/post';
import { NewsService } from './../../../../core/services/news.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  public post!: Post;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.newsService.getPost(this.route.snapshot.params['id']).subscribe(res => {
      next: this.post = res;
    });
  }

}
