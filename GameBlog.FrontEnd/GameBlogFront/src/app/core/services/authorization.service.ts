import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements OnInit {
  public accountModalSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  ngOnInit(): void {
      
  }

  public triggerForAccountModal(value: boolean): void {
    this.accountModalSubject.next(value);
  }
}
