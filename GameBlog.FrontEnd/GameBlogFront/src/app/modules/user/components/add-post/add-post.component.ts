import { AddPost } from './../../../../core/interfaces/addPost';
import { NewsService } from './../../../../core/services/news.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Topic } from 'src/app/shared/models/topic';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  public selectedFile!: File;
  public topics!: Topic[];
  public addPostForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.addPostForm = this.fb.group({
      title: this.fb.control(''),
      topicId: this.fb.control(''),
      descr: this.fb.control(''),
    });

    this.newsService.getAllTopics()
      .subscribe({
        next: res => {
          this.topics = res;
        }
      });
  }

  onFileSelected(event: any): void {
    this.selectedFile = <File>event.target.files[0];
  }  

  onSubmit(): void {
    let formData = new FormData();
    formData.append("file", this.selectedFile, this.selectedFile.name);

    this.newsService.addImage(formData)
      .subscribe({
        next: res => {
          let request: AddPost = {
            title: this.addPostForm.get('title')?.value,
            topicId: this.addPostForm.get('topicId')?.value,
            description: this.addPostForm.get('descr')?.value,
          };
          
          this.newsService.addPost(request, res)
            .subscribe({
              next: res1 => {}
            })
        }
      });
  }
}
