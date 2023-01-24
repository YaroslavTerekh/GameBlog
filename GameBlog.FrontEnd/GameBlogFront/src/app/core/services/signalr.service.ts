import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  constructor() { }

  public addedPosts: any = [];
  public banned: any = [];
  public unBanned: any = [];
  public commented: any = [];

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
      this.addedPosts.push(data);
      console.log(this.addedPosts);
      
    });
    this.hubConnection.on('PostCommented', (data: any) => {
      this.commented.push(data);
    });
    this.hubConnection.on('YouAreBanned', (data: any) => {
      this.banned.push(data);
    });
    this.hubConnection.on('YouAreUnBanned', (data: any) => {
      this.unBanned.push(data);
    });
  }
}
