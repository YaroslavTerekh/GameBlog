import { InputDirective } from './../../../../core/input.directive';
import { AddPost } from './../../../../core/interfaces/addPost';
import { NewsService } from './../../../../core/services/news.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
  public fieldsCount: number = 1;
  @ViewChildren('linkInput') private tooltipContainer!: QueryList<any>;

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

  numSequence(): Array<number> {
    return Array(this.fieldsCount);
  }

  addField(): void {
    if(this.fieldsCount < 3) {
      this.fieldsCount++;
    }
  }

  removeField(): void {
    if(this.fieldsCount > 1) {
      this.fieldsCount--;
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = <File>event.target.files[0];
  }  

  onSubmit(): void {

  }

  onSubmit1(): void {
    let formData = new FormData();
    formData.append("file", this.selectedFile, this.selectedFile.name);   

    this.newsService.addImage(formData)
      .subscribe({
        next: res => {
          let inputsArray: string[] = [];

          this.tooltipContainer.forEach(el => {
            console.log(el.nativeElement.hidden);
            
            if(el.nativeElement.value != "" && !el.nativeElement.hidden) {
              let parts = el.nativeElement.value.split("/");
              console.log(parts[parts.length - 1]);
              
              inputsArray.push(parts[parts.length - 1]);
            }
          });  

          let request: AddPost = {
            title: this.addPostForm.get('title')?.value,
            topicId: this.addPostForm.get('topicId')?.value,
            description: this.addPostForm.get('descr')?.value,
            youTubeLinks: inputsArray
          };

          this.newsService.addPost(request, res)
            .subscribe({
              next: res1 => {}
            })
        }
      });
  }
}
