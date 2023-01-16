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
    this.authoricationService.isAdminSubject
      .subscribe({
        next: res => {
          this.isAdmin = res;
        }
      });

    this.authoricationService.isJournalistSubject
      .subscribe({
        next: res => {
          this.isJournalist = res;
        }
      });
  }

  public showAccountModal(value: boolean): void {
    this.authoricationService.triggerForAccountModal(value);
  }

  public onExit(): void {
    localStorage.removeItem('Token');

    this.authoricationService.isAdminSubject.next(false);
    this.authoricationService.isJournalistSubject.next(false);
  }
}
