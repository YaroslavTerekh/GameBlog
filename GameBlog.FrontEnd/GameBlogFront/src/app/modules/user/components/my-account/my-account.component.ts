import { ModifyUser } from './../../../../core/interfaces/modifyUser';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from './../../../../core/services/user.service';
import { User } from './../../../../shared/models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  public user!: User;
  public infoGroup!: FormGroup;

  constructor(
    private readonly userService: UserService,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userService.getUserInfo()
      .subscribe({
        next: res => {
          this.user = res;
          
          this.infoGroup= new FormGroup({
            firstName: this.fb.control(this.user.firstName),
            lastName: this.fb.control(this.user.lastName),
            email: this.fb.control(this.user.email),
          });
        }
      });
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
}
