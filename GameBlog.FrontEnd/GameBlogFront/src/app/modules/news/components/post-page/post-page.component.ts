import { addComment } from './../../../../core/interfaces/addComment';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  public addComment!: FormGroup;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly newsService: NewsService,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.addComment = this.fb.group({
      text: this.fb.control(''),
    });

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

  onCommentSend(): void {
    console.log(this.addComment);
    

    let addCommentReq: addComment = {
      postId: this.post.id,
      description: this.addComment.get('text')?.value
    };

    this.newsService.addComment(addCommentReq)
      .subscribe({});
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
