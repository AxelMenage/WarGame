import { Component, OnInit } from '@angular/core';
import { GameService } from 'projects/WarGame/src/app/core/api/services';
import { Game } from 'projects/WarGame/src/app/core/api/models/game.model';
import { User } from 'projects/WarGame/src/app/core/api/models';
import { getCurrentUser } from 'projects/WarGame/src/app/core/helpers/generic';
import { GameStateEnum } from 'projects/WarGame/src/app/core/helpers/enum/game-state.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-games',
  templateUrl: './current-games.component.html',
  styleUrls: ['./current-games.component.css']
})
export class CurrentGamesComponent implements OnInit {

   currentGames: Game[] = [];
   loading: boolean = true;
   waitingGames: Game[] = [];

   currentUser: User;
  
  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = getCurrentUser();
    this.gameService.getAll(this.currentUser.id, GameStateEnum.inProgress).then(
      onsuccess => this.currentGames = onsuccess
    ).then(
      () => this.gameService.getAll(this.currentUser.id, GameStateEnum.waitingAcceptance).then(
        onsuccess => this.waitingGames = onsuccess
      )
    ).then(
      () => this.loading = false
    )
  }

  onClickDecline(id: number, index: number){
    this.gameService.delete(id).then(
      onsuccess => {
        this.waitingGames.splice(index, 1);
      }
    )
  }

  onClickAccept(id: number, index: number){
    this.gameService.changeState(id, GameStateEnum.waitingPlacements).then(
      onsuccess => {
        this.currentGames.push(this.waitingGames.find(x => x.id == id));
        this.waitingGames.splice(index, 1);
      }
    )
  }

}
