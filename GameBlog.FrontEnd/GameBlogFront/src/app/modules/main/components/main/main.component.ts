import { Post } from './../../../../shared/models/post';
import { NewsService } from './../../../../core/services/news.service';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public needLogin!: boolean;
  public newPosts!: Post[];
  public lastPost!: Post;
  public image!: any;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthorizationService,
    private readonly newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.newsService.getAllPosts()
      .subscribe({
        next: res => {
          this.newPosts = res.slice(res.length - 6, res.length - 2);
          this.lastPost = res[res.length - 1];

          console.log(this.lastPost);
          console.log(this.newPosts);
          

          this.newsService.getImage(this.lastPost.image.id)
            .subscribe({
              next: res => {
                this.image = this.createImageFromBlob(res);
              }
            });
        }
      });

    this.authService.loginModalSubject
      .subscribe({
        next: res => {
          this.needLogin = res;
        }
      });

    if (!localStorage.getItem("Token")) {
      this.router.navigate(['/welcome']);
    }
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
