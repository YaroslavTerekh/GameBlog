import { SignalrService } from './core/services/signalr.service';
import { Router } from '@angular/router';
import { UserService } from './core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './core/services/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  public title: string = "GameBlog";
  public avatar: any;
  public isOpened: boolean = false;
  public needLogin: boolean = localStorage.getItem("Token") == null;
  public openNotifications: boolean = false;
  public openSendNotifications: boolean = false;
  public notifications!: any;

  constructor(
    private readonly authoricationService: AuthorizationService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly signalr: SignalrService
  ) { }

  ngOnInit(): void {
    this.userService.getNotifications()
    .subscribe({
      next: res => {
        this.notifications = res;
      }
    });
    
    this.signalr.startConnection();
    this.signalr.addTransferChartDataListener();

    this.userService.getAvatar()
      .subscribe({
        next: (res: Blob) => {
          if (res == null) {
            this.avatar = null
          } else {
            this.createImageFromBlob(res);
          }
        }
      });

    this.authoricationService.accountModalSubject.subscribe( res =>
      {
        next: {
          this.isOpened = res;
        }
      }
    )  

    this.authoricationService.showSendNotificationSubject.subscribe( res =>
      {
        next: {
          this.openSendNotifications = res;
        }
      }
    )  
    
    this.authoricationService.loginModalSubject.subscribe( res => 
      {
        next: {
          this.needLogin = res;
        }
      }
    )

    this.authoricationService.showNotificationModalSubject.subscribe({
      next: res => {
        this.openNotifications = res;
      }
    })
  }

  public showAccountModal(value: boolean): void {
    this.authoricationService.triggerForAccountModal(value);
  }

  public showNotificationModal(value: boolean): void {
    this.authoricationService.triggerForNotificationModal(value);
  }

  public checkLoginModal(): void {
    this.authoricationService.triggerForLoginModal();
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