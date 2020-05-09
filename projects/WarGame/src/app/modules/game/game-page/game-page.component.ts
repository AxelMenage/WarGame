import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../core/api/services';
import { Ship, Game } from '../../../core/api/models';
import { ActivatedRoute } from '@angular/router';
import { GameStateEnum } from '../../../core/helpers/enum/game-state.enum';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  game: Game;
  gameState = GameStateEnum;

  constructor(private route: ActivatedRoute, private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.get(parseInt(this.route.snapshot.queryParamMap.get('id'))).then(
      onsuccess => this.game = onsuccess
    )
  }

}
