import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './core/services/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  public title: string = "GameBlog";
  public isOpened: boolean = false;
  public needLogin: boolean = localStorage.getItem("Token") == null;

  constructor(
    private readonly authoricationService: AuthorizationService
  ) { }

  ngOnInit(): void {
    this.authoricationService.accountModalSubject.subscribe( res =>
      {
        next: {
          this.isOpened = res;
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
  }

  public showAccountModal(value: boolean): void {
    this.authoricationService.triggerForAccountModal(value);
  }

  public checkLoginModal(): void {
    this.authoricationService.triggerForLoginModal();
  }
}