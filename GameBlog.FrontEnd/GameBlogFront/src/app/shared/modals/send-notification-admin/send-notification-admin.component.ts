import { AdminService } from './../../../core/services/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-send-notification-admin',
  templateUrl: './send-notification-admin.component.html',
  styleUrls: ['./send-notification-admin.component.scss']
})
export class SendNotificationAdminComponent implements OnInit {

  public sendNotificationGroup: FormGroup = this.fb.group({
    message: this.fb.control('', [Validators.required]),
  });

  constructor(
    private readonly authService: AuthorizationService,
    private readonly userService: UserService,
    private readonly adminService: AdminService,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  public toggleModal(value: boolean): void {
    this.authService.showSendNotificationSubject.next(value);
  }

  public send(): void {
    if (!this.sendNotificationGroup.valid) {
      this.userService.showInfoModalMessage$.next("Додайте повідомлення");
      this.userService.showInfoModal$.next(true);
    } else {
      this.adminService.sendToAll(this.sendNotificationGroup.get('message')?.value)
        .subscribe({
          next: res => {
            this.userService.showInfoModalMessage$.next("Успішно надіслано");
            this.userService.showInfoModal$.next(true);
          }
        })
    }
  }
}
