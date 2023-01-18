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
  public postImage!: string | ArrayBuffer | null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.newsService.getPost(this.route.snapshot.params['id'])
      .subscribe({
        next: res => {
          this.post = res;

          this.newsService.getImage(res.image.id)
            .subscribe({
              next: (res: Blob) => {
                this.createImageFromBlob(res);
              }
            })
        }
      });
  }

  createImageFromBlob(image: Blob): void {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.postImage = reader.result;      
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
  }

}
