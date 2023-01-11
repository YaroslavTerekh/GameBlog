import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/core/services/authorization.service';

@Component({
  selector: 'app-account-options-modal',
  templateUrl: './account-options-modal.component.html',
  styleUrls: ['./account-options-modal.component.scss']
})
export class AccountOptionsModalComponent implements OnInit {

  constructor(
    private readonly authoricationService: AuthorizationService
  ) { }

  ngOnInit(): void {
  }

  public showAccountModal(value: boolean): void {
    this.authoricationService.triggerForAccountModal(value);
  }
}
