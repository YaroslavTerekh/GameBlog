import { JwtHelperService } from '@auth0/angular-jwt';
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

  public newNotificationsCount!: number;
  public isAuthorized!: boolean;
  public title: string = "GameBlog";
  public avatar: any;
  public isOpened: boolean = false;
  public needLogin: boolean = localStorage.getItem("Token") == null;
  public openNotifications: boolean = false;
  public openSendNotifications: boolean = false;
  public addTopic: boolean = false;
  public showInfoModal: boolean = false;

  constructor(
    private readonly authoricationService: AuthorizationService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly signalr: SignalrService
  ) { }

  ngOnInit(): void {
    this.signalr.addedPostSubject
      .subscribe({
        next: res => {
          this.userService.countNewNotifications()
            .subscribe({
              next: res => {
                this.newNotificationsCount = res;
              }
            });
        }
      });

    this.signalr.commentedSubject
      .subscribe({
        next: res => {
          this.userService.countNewNotifications()
            .subscribe({
              next: res => {
                this.newNotificationsCount = res;
              }
            });
        }
      });

    this.signalr.bannedSubject
      .subscribe({
        next: res => {
          this.userService.countNewNotifications()
            .subscribe({
              next: res => {
                this.newNotificationsCount = res;
              }
            });
        }
      });

      this.signalr.unBannedSubject
      .subscribe({
        next: res => {
          this.userService.countNewNotifications()
            .subscribe({
              next: res => {
                this.newNotificationsCount = res;
              }
            });          
        }
      });

      this.signalr.toAllUsersSubject
      .subscribe({
        next: res => {
          this.userService.countNewNotifications()
            .subscribe({
              next: res => {
                this.newNotificationsCount = res;
              }
            });
        }
      });

    this.userService.showInfoModal$
      .subscribe({
        next: res => {
          this.showInfoModal = res;
        }
      })

    this.authoricationService.reloadAvatarSubject
      .subscribe({
        next: res => {
          this.userService.getAvatar(localStorage.getItem('id')!)
            .subscribe({
              next: (res: Blob) => {
                if (res == null) {
                  this.avatar = null;
                } else {
                  this.createImageFromBlob(res);
                }
              }
            });
        }
      });

    this.authoricationService.isAuthorizedSubject
      .subscribe({
        next: res => {
          this.isAuthorized = res;

          this.authoricationService.deleteAvatarSubject
            .subscribe({
              next: res => {
                if (res === true) {
                  this.avatar = null;
                }
              }
            });

          if (res === true) {

            this.userService.countNewNotifications()
              .subscribe({
                next: res => {
                  this.newNotificationsCount = res;
                }
              });

            this.userService.getAvatar(localStorage.getItem('id')!)
              .subscribe({
                next: (res: Blob) => {
                  if (res == null) {
                    this.avatar = null;
                  } else {
                    this.createImageFromBlob(res);
                  }
                }
              });
          }
        }
      });
    this.isAuthorized = this.authoricationService.isAuthorized();

    if (this.isAuthorized) {

      this.userService.countNewNotifications()
        .subscribe({
          next: res => {
            this.newNotificationsCount = res;
          }
        });

      this.userService.getAvatar(localStorage.getItem('id')!)
        .subscribe({
          next: (res: Blob) => {
            if (res == null) {
              this.avatar = null;
            } else {
              this.createImageFromBlob(res);
            }
          }
        });
    }

    this.signalr.startConnection();
    this.signalr.addTransferChartDataListener();

    this.authoricationService.accountModalSubject.subscribe(res => {
      next: {
        this.isOpened = res;
      }
    }
    )

    this.authoricationService.showSendNotificationSubject.subscribe(res => {
      next: {
        this.openSendNotifications = res;
      }
    }
    )

    this.authoricationService.loginModalSubject.subscribe(res => {
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

    this.authoricationService.showAddTopicModalSubject.subscribe({
      next: res => {
        this.addTopic = res;
      }
    })
  }

  public showAccountModal(value: boolean): void {
    this.authoricationService.triggerForAccountModal(value);
  }

  public showNotificationModal(value: boolean): void {
    this.authoricationService.triggerForNotificationModal(value);
    this.userService.readAllNotifications()
      .subscribe({
        next: res => {
          this.userService.countNewNotifications()
            .subscribe({
              next: res => {
                this.newNotificationsCount = res;
              }
            });
        }
      })
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