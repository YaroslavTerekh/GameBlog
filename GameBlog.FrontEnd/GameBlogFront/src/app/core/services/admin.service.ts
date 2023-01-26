import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiAddress}/admin/users`);
  }

  public getDataForChart(): Observable<any> {
    return this.http.get(`${environment.apiAddress}/admin/users/for-charts`);
  }

  public banUsers(userId: string): Observable<any> {
    return this.http.patch(`${environment.apiAddress}/admin/users/ban/${userId}`, null);
  }

  public unbanUsers(id: string): Observable<any> {
    return this.http.patch(`${environment.apiAddress}/admin/users/unban/${id}`, null);
  }

  public sendToAll(message: string): Observable<any> {
    return this.http.post(`${environment.apiAddress}/admin/users/send-to-all`, {message});
  }
}
