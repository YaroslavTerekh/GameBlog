import { Post } from './../../../../shared/models/post';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input()
  public post!: Post;

  constructor() { }

  ngOnInit(): void {
  }

}
