import { NewsService } from 'src/app/core/services/news.service';
import { Journalist } from './../../../../shared/models/journalist';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-journalist',
  templateUrl: './journalist.component.html',
  styleUrls: ['./journalist.component.scss']
})
export class JournalistComponent implements OnInit {

  @Input()
  public journalist!: Journalist;
  public avatar!: any;

  constructor(
    private readonly newsService: NewsService
  ) { }

  ngOnInit(): void {
    
    if(this.journalist.user.avatar != null) {
      this.newsService.getImage(this.journalist.user.avatar.id)
      .subscribe({
        next: (res: Blob) => {
          this.createImageFromBlob(res);
        },
        error: res => {

        }
      });
    }
  }

  createImageFromBlob(image: Blob): void {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.avatar = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

}
