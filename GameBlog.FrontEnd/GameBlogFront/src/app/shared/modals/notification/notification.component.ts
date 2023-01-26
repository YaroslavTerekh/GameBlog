import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input()
  public notification!: any;
  @Output()
  public deleteNotification: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }
  
  public deleteNotification1(id: string): void {
    this.userService.deleteNotification(id).subscribe({});
    this.reloadComponent();
    this.ngOnInit();
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['']);
}
}
