import { AuthorizationService } from './../../../../core/services/authorization.service';
import { Journalist } from 'src/app/shared/models/journalist';
import { NewsService } from 'src/app/core/services/news.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-journalist-info-page',
  templateUrl: './journalist-info-page.component.html',
  styleUrls: ['./journalist-info-page.component.scss']
})
export class JournalistInfoPageComponent implements OnInit {

  public id: string = this.route.snapshot.params['id'];
  public isReader: boolean = localStorage.getItem('Role') == "User";
  public journalist!: Journalist;
  public subscribers!: number;
  public journalistAvatar!: any;
  public issub!: boolean;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly newsService: NewsService,
    private readonly userService: UserService
  ) { }

  ngOnInit(): void {
    if(this.isReader){
      this.userService.isSubs(this.id)
        .subscribe({
          next: res => {
            this.issub = res;
            console.log(res);
            
          }
        });
    }

    this.newsService.getJournalist(this.id)
      .subscribe({
        next: res => {
          this.journalist = res;
          this.subscribers = this.journalist.subscribers.length;

          this.newsService.getImage(res.user.avatar.id)
            .subscribe({
              next: res => {
                this.createImageFromBlob(res);
              }
            });          
        }
      });
  }

  createImageFromBlob(image: Blob): void {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.journalistAvatar = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  onSubscribe(): void {
    this.userService.subscribe(this.journalist.id).subscribe({
      next: res => {
        this.issub = !this.issub;
        this.subscribers++;
      }
    })
  }

  onUnsubscribe(): void {
    this.userService.unsubscribe(this.journalist.id).subscribe({
      next: res => {
        this.issub = !this.issub;
        this.subscribers--;
      }
    })
  }
}
