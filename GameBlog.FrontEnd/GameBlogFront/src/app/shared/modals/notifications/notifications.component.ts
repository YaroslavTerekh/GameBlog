import { Router } from '@angular/router';
import { SignalrService } from './../../../core/services/signalr.service';
import { UserService } from 'src/app/core/services/user.service';
import { AuthorizationService } from './../../../core/services/authorization.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  @Input()
  public notifications!: any;
  public newNotifications: any[] = [];

  constructor(
    private readonly authService: AuthorizationService,
    private readonly userService: UserService,
    private readonly signalService: SignalrService,
  ) { }

  ngOnInit(): void {
    this.signalService.addedPostSubject
      .subscribe({
        next: res => {
          if (res) {
            this.newNotifications.push(res);
          }
        }
      });

    this.signalService.commentedSubject
      .subscribe({
        next: res => {
          if (res) {
            this.newNotifications.push(res);
          }
        }
      });

    this.signalService.bannedSubject
      .subscribe({
        next: res => {
          if (res) {
            this.newNotifications.push(res);
          }
        }
      });

    this.signalService.unBannedSubject
      .subscribe({
        next: res => {
          if (res) {
            this.newNotifications.push(res);
          }
        }
      });
  }

  public showNotificationModal(value: boolean): void {
    this.authService.triggerForNotificationModal(value);
  }


  public deleteNotification(id: string): void {
    this.userService.deleteNotification(id).subscribe({
      next: res => {
        this.userService.getNotifications()
          .subscribe({
            next: res => {
              this.newNotifications = [];
              this.notifications = res;
            }
          });
      }
    });
  }
}
