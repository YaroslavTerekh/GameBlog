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

  constructor(
    private readonly authoricationService: AuthorizationService
  ) { }

  ngOnInit(): void {
    this.authoricationService.accountModalSubject.subscribe( res =>
      {
        next: this.isOpened = res;
      }
    )
  }

  public showAccountModal(value: boolean): void {
    this.authoricationService.triggerForAccountModal(value);
  }
}