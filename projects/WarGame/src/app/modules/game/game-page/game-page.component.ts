import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../core/api/services';
import { Ship, Game, User } from '../../../core/api/models';
import { ActivatedRoute } from '@angular/router';
import { GameStateEnum } from '../../../core/helpers/enum/game-state.enum';
import { getCurrentUser } from '../../../core/helpers/generic';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  game: Game;
  gameState = GameStateEnum;
  waitingOpponentPlacement = false;
  currentUser: User;

  constructor(private route: ActivatedRoute, private gameService: GameService) { }

  ngOnInit(): void {
    this.currentUser = getCurrentUser();
    this.gameService.get(parseInt(this.route.snapshot.queryParamMap.get('id'))).then(
      onsuccess => this.game = onsuccess
    )
  }

  currentUserPlacementOK(){
    return this.game.player1Id == this.currentUser.id && this.game.posPlayer1Ok || this.game.player2Id == this.currentUser.id && this.game.posPlayer2Ok;
  }

  placementCompleted(game: Game){
    console.log(game);
    this.game = game;
  }

}
