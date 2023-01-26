import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  constructor() { }
  public addedPostSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public commentedSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public bannedSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public unBannedSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public toAllUsersSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private hubConnection!: signalR.HubConnection
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7000/notifications?token=${localStorage.getItem('Token')?.split(" ")[1]}`)
      .withAutomaticReconnect()
      .build();
    this.hubConnection.serverTimeoutInMilliseconds = 100000;
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addTransferChartDataListener = () => {
    this.hubConnection.on('AddedPost', (data: any) => {
      this.addedPostSubject.next(data);
      
    });
    this.hubConnection.on('PostCommented', (data: any) => {
      this.commentedSubject.next(data);
    });
    this.hubConnection.on('YouAreBanned', (data: any) => {
      this.bannedSubject.next(data);
    });
    this.hubConnection.on('YouAreUnBanned', (data: any) => {
      this.unBannedSubject.next(data);
    });
    this.hubConnection.on('ToAllUsers', (data: any) => {
      this.toAllUsersSubject.next(data);
    });
  }
}
