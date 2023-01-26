import { AdminService } from './../../../core/services/admin.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-send-notification-admin',
  templateUrl: './send-notification-admin.component.html',
  styleUrls: ['./send-notification-admin.component.scss']
})
export class SendNotificationAdminComponent implements OnInit {

  public sendNotificationGroup: FormGroup = this.fb.group({
    message: this.fb.control(''),
  });

  constructor(
    private readonly authService: AuthorizationService,
    private readonly adminService: AdminService,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  public toggleModal(value: boolean): void {
    this.authService.showSendNotificationSubject.next(value);
  }

  public send(): void {
    this.adminService.sendToAll(this.sendNotificationGroup.get('message')?.value)
      .subscribe({})
  }
}
