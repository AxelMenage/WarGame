import { Injectable, EventEmitter } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Message } from '../../models';
import { environment } from 'projects/WarGame/src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageReceived = new EventEmitter<Message>();  
  connectionEstablished = new EventEmitter<Boolean>();  
  
  private connectionIsEstablished = false;  
  private _hubConnection: HubConnection;
  private gameId: number;  
  
  constructor(private http: HttpClient) {  
    this.createConnection(); 
  }

  getByGame(id: number){
    return this.http.get<Message[]>(environment.apiUrl + environment.getMessagesUrl + "/" + id)
    .toPromise();
  }

  create(message: Message){
    return this.http.post<boolean>(environment.apiUrl + environment.messagesUrl, message)
    .toPromise();
  }
  
  setGameId(gameId: number){
    this.gameId = gameId;
  }
  
  sendMessage(message: Message) {  
    this._hubConnection.invoke('NewMessage', message);
    this.create(message);
  }  
  
  private createConnection() {  
    this._hubConnection = new HubConnectionBuilder()  
      .withUrl(environment.apiUrl + 'MessageHub')  
      .build();  
  }  
  
  startConnection(): void {  
    this._hubConnection  
      .start()  
      .then(() => {  
        this.connectionIsEstablished = true;  
        console.log('Hub connection started');  
        this.connectionEstablished.emit(true);  
      })  
      .catch(err => {  
        console.log('Error while establishing connection, retrying...');  
        setTimeout(function () { this.startConnection(); }, 5000);  
      });  
  }  
  
  registerOnServerEvents(): void {  
    if(this.gameId != null){
      this._hubConnection.on('MessageReceived'+this.gameId, (data: any) => {  
        this.messageReceived.emit(data);  
      });
    }
    else console.log("No game id provided !")
  }  
}
