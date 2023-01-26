import { NewsService } from 'src/app/core/services/news.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Post } from 'src/app/shared/models/post';
import { debounceTime, fromEvent, tap } from 'rxjs';

@Component({
  selector: 'app-top-posts',
  templateUrl: './top-posts.component.html',
  styleUrls: ['./top-posts.component.scss']
})
export class TopPostsComponent implements OnInit, AfterViewInit {

  public posts!: Post[];
  public oldPosts!: Post[];
  @ViewChild('input') input!: ElementRef;

  constructor(
    private readonly newsService: NewsService
  ) { }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup')
    .pipe(
      tap(() => this.search())
    )
    .subscribe()
  }

  ngOnInit(): void {
    this.newsService.getNewPosts()
      .subscribe({
        next: res => {
          this.posts = res;
          this.oldPosts = this.posts;
        }
      })
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
