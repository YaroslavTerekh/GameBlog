import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit {

  public needAllPosts: boolean = this.router.url === '/news'

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

}
