import { NewsService } from 'src/app/core/services/news.service';
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
  public postImage!: string | ArrayBuffer | null;
  public time!: string;

  constructor(
    private readonly newsService: NewsService
  ) { }

  ngOnInit(): void {  
    this.newsService.getImage(this.post.image.id)
      .subscribe({
        next: (res: Blob) => {
          this.createImageFromBlob(res);
          this.time = " " + this.post.createdTime.split("T")[0];          
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
