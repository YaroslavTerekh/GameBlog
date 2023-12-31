import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { addComment } from './../../../../core/interfaces/addComment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from './../../../../shared/models/post';
import { NewsService } from './../../../../core/services/news.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  public post!: Post;
  public postImage!: string | ArrayBuffer | null;
  public addComment!: FormGroup;
  public isAuthorized!: boolean;
  public isAdmin!: boolean;
  public isAuthor!: boolean;
  public links: SafeUrl[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly newsService: NewsService,
    private readonly authService: AuthorizationService,
    private readonly userService: UserService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {

    if (localStorage.getItem('Role')) {
      this.isAdmin = localStorage.getItem('Role') == 'Admin';
    }

    this.addComment = this.fb.group({
      text: this.fb.control('', [Validators.required, Validators.maxLength(20)]),
    });

    this.newsService.getPost(this.route.snapshot.params['id'])
      .subscribe({
        next: res => {
          this.post = res;
          this.post.youTubeUrls.forEach(element => {
            this.links.push(this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${element.youTubeUrl}`));
          });
          if (localStorage.getItem('id')) {
            this.isAuthor = localStorage.getItem('id') == this.post.journalist.user.id
          }

          this.isAuthorized = this.authService.isAuthorized();

          this.newsService.getImage(res.image.id)
            .subscribe({
              next: (res: Blob) => {
                this.createImageFromBlob(res);
              }
            })
        }
      });
  }

  deletePost(id: string): void {
    this.newsService.deletePost(id).subscribe({
      next: res => {
        this.router.navigate(['']);
      }
    });
  }

  onCommentSend(): void {
    if (!this.addComment.valid) {
      this.userService.showInfoModalMessage$.next("Напишіть Ваш коментар");
      this.userService.showInfoModal$.next(false);
      this.userService.showInfoModal$.next(true);
    } else {
      let addCommentReq: addComment = {
        postId: this.post.id,
        description: this.addComment.get('text')?.value
      };

      this.newsService.addComment(addCommentReq)
        .subscribe({
          next: res => {
            this.addComment.setControl('text', null);
            this.userService.showInfoModalMessage$.next("Коментар успішно додано");
            this.userService.showInfoModal$.next(false);
            this.userService.showInfoModal$.next(true);
            this.newsService.getPost(this.route.snapshot.params['id'])
              .subscribe({
                next: res => {
                  this.post.comments = res.comments;
                }
              })
          }
        });
    }
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
