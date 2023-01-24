import { SignalrService } from './../../../core/services/signalr.service';
import { UserService } from 'src/app/core/services/user.service';
import { AuthorizationService } from './../../../core/services/authorization.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  public notifications!: any;
  public newNotifications!: any;

  constructor(
    private readonly authService: AuthorizationService,
    private readonly userService: UserService,
    private readonly signalService: SignalrService
  ) { }

  ngOnInit(): void {
    this.newNotifications = this.signalService.addedPosts;
    
    this.userService.getNotifications()
      .subscribe({
        next: res => {
          this.notifications = res;
        }
      });
  }

  public showNotificationModal(value: boolean): void {
    this.authService.triggerForNotificationModal(value);
  }
}
