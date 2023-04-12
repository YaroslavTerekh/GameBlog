import { environment } from './../../../environments/environment';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { ModifyUser } from '../interfaces/modifyUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public showInfoModal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showInfoModalMessage$: ReplaySubject<string> = new ReplaySubject<string>(1);

  constructor(
    private readonly http: HttpClient
  ) { }

  public uploadAvatar(data: any): Observable<any> {
    return this.http.post(`${environment.apiAddress}/auth/avatar`, data);
  }

  public getAvatar(id: string): Observable<any> {
    return this.http.get(`${environment.apiAddress}/auth/avatar/${id}`, {
      responseType: 'blob'
    });
  }

  public getUserInfo(): Observable<User> {
    return this.http.get<User>(`${environment.apiAddress}/auth/user/info`);
  }

  public modifyUserInfo(user: ModifyUser): Observable<any> {
    return this.http.put(`${environment.apiAddress}/auth/user/info`, user);
  }

  public modifyUserBio(bio: any): Observable<any> {
    return this.http.patch(`${environment.apiAddress}/auth/bio`, bio);
  }

  public subscribe(id: string): Observable<any> {
    return this.http.post(`${environment.apiAddress}/auth/subscribe/${id}`, null);
  }
  
  public unsubscribe(id: string): Observable<any> {
    return this.http.post(`${environment.apiAddress}/auth/unsubscribe/${id}`, null);
  }

  public isSubs(id: string): Observable<any> {
    return this.http.post(`${environment.apiAddress}/auth/issubs/${id}`, null);
  }

  public getNotifications(): Observable<any> {
    return this.http.get(`${environment.apiAddress}/notifications`);
  }

  public deleteNotification(id: string): Observable<any> {
    return this.http.delete(`${environment.apiAddress}/notifications/${id}`);
  }

  public countNewNotifications(): Observable<number> {
    return this.http.get<number>(`${environment.apiAddress}/notifications/count-new`);
  }

  public readAllNotifications(): Observable<any> {
    return this.http.patch(`${environment.apiAddress}/notifications/read-all`, null);
  }
}
