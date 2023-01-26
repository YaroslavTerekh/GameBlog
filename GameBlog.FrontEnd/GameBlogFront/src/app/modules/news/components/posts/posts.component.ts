import { ActivatedRoute } from '@angular/router';
import { NewsService } from './../../../../core/services/news.service';
import { Post } from './../../../../shared/models/post';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { fromEvent, tap } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, AfterViewInit {

  public posts!: Post[];
  public oldPosts!: Post[];
  public id: string = this.route.snapshot.params['id'];
  @ViewChild('input') input!: ElementRef;

  constructor(
    private readonly newsService: NewsService,
    private readonly route: ActivatedRoute
  ) { }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup')
    .pipe(
      tap(() => this.search())
    )
    .subscribe()
  }

  ngOnInit(): void {     
    if(this.id != null) {
      this.newsService.getTopicPosts(this.id)
        .subscribe({
          next: res => {
            this.posts = res;
            this.oldPosts = res;            
          }
        });
    } else {
      this.newsService.getAllPosts()
        .subscribe({
          next: res => {
            this.posts = res;
            this.oldPosts = res;
          }
        });
    }
  }

  search(): void {      
    if (this.input.nativeElement.value.length > 0) {      
      this.posts = []
      this.oldPosts.forEach(el => {        
        if (el.title.toLowerCase().search(this.input.nativeElement.value.toLowerCase()) != -1) {
          this.posts.push(el);
        }
      });
    } else {
      this.ngOnInit();
    }
  }
}
