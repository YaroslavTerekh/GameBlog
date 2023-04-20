import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent implements OnInit {

  public message!: string;

  constructor(
    private  readonly userService: UserService
  ) { }

  ngOnInit(): void {
    console.log("init");


    this.userService.showInfoModalMessage$
      .subscribe({
        next: res => {
          this.message = res;
        }
      })

    setTimeout(() => {
      this.userService.showInfoModal$.next(false);
    }, 5000);
  }

}
