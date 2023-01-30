import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/core/services/authorization.service';

@Component({
  selector: 'app-account-options-modal',
  templateUrl: './account-options-modal.component.html',
  styleUrls: ['./account-options-modal.component.scss']
})
export class AccountOptionsModalComponent implements OnInit {

  public isAdmin!: boolean;
  public isJournalist!: boolean;

  constructor(
    private readonly authoricationService: AuthorizationService
  ) { }

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('Role') == "Admin";
    this.isJournalist = localStorage.getItem('Role') == "Journalist";
  }

  public showAccountModal(value: boolean): void {
    this.authoricationService.triggerForAccountModal(value);
  }

  public onExit(): void {
    localStorage.removeItem('Token');
    localStorage.removeItem('Role');
    localStorage.removeItem('id');

    this.authoricationService.deleteAvatarSubject.next(true);
    this.authoricationService.isAuthorizedSubject.next(false);
    this.authoricationService.accountModalSubject.next(false);
    this.authoricationService.loginModalSubject.next(true);
  }
}
