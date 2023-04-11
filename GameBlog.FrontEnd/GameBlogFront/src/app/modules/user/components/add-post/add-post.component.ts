import { InputDirective } from './../../../../core/input.directive';
import { AddPost } from './../../../../core/interfaces/addPost';
import { NewsService } from './../../../../core/services/news.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, Input } from '@angular/core';
import { Topic } from 'src/app/shared/models/topic';
import { UserService } from 'src/app/core/services/user.service';

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
    private readonly userService: UserService,
    private readonly newsService: NewsService
  ) { }

  ngOnInit(): void {
    let input: HTMLInputElement | null = document.querySelector(".file-upload-field");
    let wrapper = document.querySelector(".file-upload-wrapper");

    input?.addEventListener("change", function(event){ 
      if(input!.files) {
        wrapper?.setAttribute("data-text", input!.files[0].name.toString());
      }
    });

    this.addPostForm = this.fb.group({
      title: this.fb.control('', Validators.required),
      topicId: this.fb.control('', Validators.required),
      descr: this.fb.control('', Validators.required),
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
    if (this.fieldsCount < 3) {
      this.fieldsCount++;
    }
  }

  removeField(): void {
    if (this.fieldsCount > 1) {
      this.fieldsCount--;
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = <File>event.target.files[0];
  }

  onSubmit(): void {

  }

  onSubmit1(): void {
    if (!this.addPostForm.valid || !this.selectedFile) {
      this.userService.showInfoModalMessage$.next("Заповніть всі поля");
      this.userService.showInfoModal$.next(true);
    } else {
      let formData = new FormData();
      formData.append("file", this.selectedFile, this.selectedFile.name);

      this.newsService.addImage(formData)
        .subscribe({
          next: res => {
            let inputsArray: string[] = [];

            this.tooltipContainer.forEach(el => {
              if (el.nativeElement.value != "" && !el.nativeElement.hidden) {
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
                next: res1 => { 
                  this.userService.showInfoModalMessage$.next("Пост успішно створено");
                  this.userService.showInfoModal$.next(false);
                  this.userService.showInfoModal$.next(true);
                },
                error: err => {
                  this.userService.showInfoModalMessage$.next(err.error.response ? err.error.response : err.error);
                  this.userService.showInfoModal$.next(false);
                  this.userService.showInfoModal$.next(true);
                }
              })
          }
        });
    }
  }
}
