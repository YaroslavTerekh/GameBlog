import { NewsService } from './../../../../core/services/news.service';
import { Post } from './../../../../shared/models/post';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-post',
  templateUrl: './main-post.component.html',
  styleUrls: ['./main-post.component.scss']
})
export class MainPostComponent implements OnInit {

  @Input()
  public post!: Post;
  public image!: any;

  constructor(
    private readonly newsService: NewsService
    ) { }

  ngOnInit(): void {
    this.newsService.getImage(this.post.image.id)
      .subscribe({
        next: res => {
          this.image = this.createImageFromBlob(res);
        }
      });
  }

  createImageFromBlob(image: Blob): void {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.image = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
