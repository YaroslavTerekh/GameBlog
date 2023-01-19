import { AdminService } from './../../../../core/services/admin.service';
import { User } from 'src/app/shared/models/user';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input()
  public user!: User;

  constructor(
    private readonly adminService: AdminService
  ) { }

  ngOnInit(): void {
  }

  banUser(id: string): void {
    this.adminService.banUsers(id).subscribe({});
  }

  unbanUser(id: string): void {
    this.adminService.unbanUsers(id).subscribe({});
  }
}
