import { Component, OnInit, NgZone, Input } from '@angular/core';
import { Message, User, Game } from 'projects/WarGame/src/app/core/api/models';
import { MessageService } from 'projects/WarGame/src/app/core/api/services';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit{
  
  txtMessage: string = '';  
  uniqueID: 0;  
  messages: Message[] = [];  
  message: Message;
  
  @Input() currentUser: User;
  @Input() currentGame: Game;

  constructor(  
    private messageService: MessageService,  
    private _ngZone: NgZone  
  ) {
  }

  ngOnInit(){
    this.messageService.getByGame(this.currentGame.id).then(
      onsuccess => {
        this.messages = onsuccess;
        this.messageService.setGameId(this.currentGame.id);
        this.messageService.registerOnServerEvents();
        this.messageService.startConnection();
        this.subscribeToEvents(); 
      }
    )
     
  }

  sendMessage(): void {  
    if (this.txtMessage) {  
      this.message = new Message();  
      this.message.userIdSender = this.currentUser.id;
      this.message.gameId = this.currentGame.id;
      this.message.content = this.txtMessage;  
      this.message.date = new Date();
      this.messages.push(this.message);  
      this.messageService.sendMessage(this.message);  
      this.txtMessage = '';  
    }  
  }  
  private subscribeToEvents(): void {  
  
    this.messageService.messageReceived.subscribe((message: Message) => {  
      this._ngZone.run(() => {  
        if (message.userIdSender !== this.currentUser.id) {    
          this.messages.push(message);  
        }  
      });  
    });  
  }  

}
