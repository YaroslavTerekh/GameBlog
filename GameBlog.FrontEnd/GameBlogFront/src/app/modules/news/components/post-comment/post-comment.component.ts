import { PostComment } from './../../../../shared/models/postComment';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit {
  
  @Input()
  comment!: PostComment;

  constructor() { }

  ngOnInit(): void {
  }

}
