import { NewsService } from './../../../core/services/news.service';
import { AddTopic } from './../../../core/interfaces/addTopic';
import { AdminService } from './../../../core/services/admin.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.scss']
})
export class AddTopicComponent implements OnInit {

  public selectedFile!: File;
  public addTopicGroup: FormGroup = this.fb.group({
    title: this.fb.control(''),
    description: this.fb.control(''),
  });

  constructor(
    private readonly authService: AuthorizationService,
    private readonly adminService: AdminService,
    private readonly newsService: NewsService,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any): void {
    this.selectedFile = <File>event.target.files[0];
  }  

  toggleAddTopic(value: boolean): void {
    this.authService.showAddTopicModalSubject.next(value);
  }

  onSubmit(): void {
    let formData = new FormData();
    console.log(this.selectedFile);
    
    formData.append("file", this.selectedFile, this.selectedFile.name);   

    this.newsService.addImage(formData)
      .subscribe({
        next: res => {
          let model: AddTopic = {
            title: this.addTopicGroup.get('title')?.value,
            description: this.addTopicGroup.get('description')?.value,
            imageId: res
          }
      
          this.adminService.addTopic(model)
            .subscribe({});
        }
      });
  }
}
