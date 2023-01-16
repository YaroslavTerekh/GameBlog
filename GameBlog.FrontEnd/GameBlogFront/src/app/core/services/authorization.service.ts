import { Register } from './../interfaces/register';
import { environment } from './../../../environments/environment.prod';
import { Login } from '../interfaces/login';
import { Observable } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements OnInit {
  public accountModalSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public loginModalSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isJournalistSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private helper: JwtHelperService = new JwtHelperService();

  constructor(
    private readonly http: HttpClient
  ) { }

  ngOnInit(): void {
      
  }

  public logIn(userCreds: Login): Observable<any> {
    return this.http.post<any>(`${environment.apiAddress}/auth/login`, userCreds);
  }

  public register(user: Register): Observable<any> {
    return this.http.post<any>(`${environment.apiAddress}/auth/register`, user);
  }

  //logic methods

  public isAuthorized(): boolean {
    let token = localStorage.getItem('Token');

    return !this.helper.isTokenExpired(token);
  }
  
  public triggerForAccountModal(value: boolean): void {
    this.accountModalSubject.next(value);
  }

  public triggerForLoginModal(): void {
    this.loginModalSubject.next(localStorage.getItem("Token") == null);
  }
}
