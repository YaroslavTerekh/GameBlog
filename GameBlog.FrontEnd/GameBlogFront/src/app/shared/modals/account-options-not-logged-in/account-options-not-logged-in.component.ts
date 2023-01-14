import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-options-not-logged-in',
  templateUrl: './account-options-not-logged-in.component.html',
  styleUrls: ['./account-options-not-logged-in.component.scss']
})
export class AccountOptionsNotLoggedInComponent implements OnInit {

  constructor(
    private readonly authoricationService: AuthorizationService
  ) { }

  ngOnInit(): void {
  }

  public showAccountModal(value: boolean): void {
    this.authoricationService.triggerForAccountModal(value);
  }

}
