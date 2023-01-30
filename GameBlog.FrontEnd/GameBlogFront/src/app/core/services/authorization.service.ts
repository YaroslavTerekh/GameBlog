import { ResetPassword } from './../interfaces/resetPassword';
import { Register } from './../interfaces/register';
import { environment } from './../../../environments/environment.prod';
import { Login } from '../interfaces/login';
import { Observable } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ForgotPassword } from '../interfaces/forgotPassword';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements OnInit {
  public deleteAvatarSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public reloadAvatarSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isAuthorizedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public accountModalSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public loginModalSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isJournalistSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public showNotificationModalSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public showSendNotificationSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public showForgotPasswordModalSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
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

  public forgotPassword(route: string, body: ForgotPassword): Observable<any> {
    return this.http.post(`${environment.apiAddress}/auth/forgotPassword`, body);
  }

  public resetPassword(route: string, body: ResetPassword): Observable<any> {
    return this.http.post(`${environment.apiAddress}/auth/resetPassword`, body);
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

  public triggerForNotificationModal(value: boolean): void {
    this.showNotificationModalSubject.next(value);
  }

  public triggerForForgotPasswordModal(value: boolean): void {
    this.showForgotPasswordModalSubject.next(value);
  }
}
