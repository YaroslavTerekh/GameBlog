import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { ModifyUser } from '../interfaces/modifyUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public getUserInfo(): Observable<User> {
    return this.http.get<User>(`${environment.apiAddress}/auth/user/info`);
  }

  public modifyUserInfo(user: ModifyUser): Observable<any> {
    return this.http.put(`${environment.apiAddress}/auth/user/info`, user);
  }
}
