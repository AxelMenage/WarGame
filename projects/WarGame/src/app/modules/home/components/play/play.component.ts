import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { Friend, User } from 'projects/WarGame/src/app/core/api/models';
import { FriendService, GameService } from 'projects/WarGame/src/app/core/api/services';
import { Game } from 'projects/WarGame/src/app/core/api/models/game.model';
import { ModeEnum } from 'projects/WarGame/src/app/core/helpers/enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  mode: number = ModeEnum.classic;
  modeName: string = "Classique";
  friends: Friend[];
  friendsLoading = false;
  currentUser: User;

  modalReference: NgbModalRef;
  @ViewChild('modalcontent') modalcontent;

  constructor(private modalService: NgbModal, 
    private friendService: FriendService,
    private gameService: GameService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) as User;
  }

  openModal(){
    this.friendsLoading = true;
    this.modalReference = this.modalService.open(this.modalcontent);
    this.friendService.getFriends(this.currentUser.id).then(
      onsuccess => {this.friends = onsuccess; this.friendsLoading = false;}
    );
  }

  closeModal() {
    this.modalReference.close();
  }

  onModeChange(mode: number){
    this.mode = mode;
    switch(mode){
      case ModeEnum.classic : 
        this.modeName = "Classic";
        break; 
      case ModeEnum.cards : 
        this.modeName = "Cards";
        break; 
      default:
        break; 
    }
  }

  createGame(id1, id2){
    let game = new Game();
    game.gameTypeId = this.mode;
    game.player1Id = this.currentUser.id == id1 ? id1: id2;
    game.player2Id = this.currentUser.id == id1 ? id2: id1;
    this.gameService.create(game).then(
      onsuccess => {
        this.closeModal();
        this.toastr.success('Waiting for your opponent responde...', 'Invitation sended !');
      }
    );
  }

}
