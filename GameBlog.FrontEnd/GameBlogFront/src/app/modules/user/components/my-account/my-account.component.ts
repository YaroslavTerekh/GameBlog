import { PostComment } from './../../../../shared/models/postComment';
import { ModifyUser } from './../../../../core/interfaces/modifyUser';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from './../../../../core/services/user.service';
import { User } from './../../../../shared/models/user';
import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/core/services/news.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  public user!: User;
  public infoGroup: FormGroup = this.fb.group({
    firstName: this.fb.control(''),
    lastName: this.fb.control(''),
    email: this.fb.control(''),
  });
  public bioGroup: FormGroup = this.fb.group({
    aboutMe: this.fb.control('')
  });
  public avatar!: any;
  public comments!: PostComment[];

  constructor(
    private readonly userService: UserService,
    private readonly newsService: NewsService,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    let input: HTMLInputElement | null = document.querySelector(".file-upload-field");
    let wrapper = document.querySelector(".file-upload-wrapper");

    input?.addEventListener("change", function(event){ 
      if(input!.files) {
        wrapper?.setAttribute("data-text", input!.files[0].name.toString());
      }
    });
    
    this.newsService.getLastComments()
      .subscribe({
        next: res => {
          this.comments = res;
          console.log(res);
          
        }
      });

    this.userService.getUserInfo()
      .subscribe({
        next: res => {
          this.user = res;

          this.infoGroup = new FormGroup({
            firstName: this.fb.control(this.user.firstName),
            lastName: this.fb.control(this.user.lastName),
            email: this.fb.control(this.user.email),
          });

          this.bioGroup = this.fb.group({
            aboutMe: this.fb.control(this.user.aboutMe)
          });
        }
      });

    this.userService.getAvatar(localStorage.getItem('id')!)
      .subscribe({
        next: (res: Blob) => {
          if (res == null) {
            this.avatar = null
          } else {
            this.createImageFromBlob(res);
          }
        }
      });
  }

  uploadAvatar(event: any): void {
    let selectedFile = <File>event.target.files[0];
    let formData = new FormData();
    formData.append("file", selectedFile, selectedFile.name);

    this.userService.uploadAvatar(formData).subscribe({});
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

  public modifyUserInfo(): void {
    let user: ModifyUser = {
      firstName: this.infoGroup.get('firstName')?.value,
      lastName: this.infoGroup.get('lastName')?.value,
      email: this.infoGroup.get('email')?.value,
    }

    this.userService.modifyUserInfo(user)
      .subscribe({
        next: res => {
          this.userService.getUserInfo()
            .subscribe({
              next: res => {
                this.user = res;
              }
            });
        }
      });
  }

  public modifyUserBio(): void {
    let req:any = {
      bio: this.bioGroup.get('aboutMe')?.value
    };

      if(!this.bioGroup.get('aboutMe')?.value) return;

    this.userService.modifyUserBio(req).subscribe({});
  }
}
