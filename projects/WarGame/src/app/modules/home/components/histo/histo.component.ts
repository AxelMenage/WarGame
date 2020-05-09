import { Component, OnInit } from '@angular/core';
import { GameService } from 'projects/WarGame/src/app/core/api/services';
import { User } from 'projects/WarGame/src/app/core/api/models';
import { Game } from 'projects/WarGame/src/app/core/api/models/game.model';
import { GameStateEnum } from 'projects/WarGame/src/app/core/helpers/enum/game-state.enum';
import { getCurrentUser } from 'projects/WarGame/src/app/core/helpers/generic';

@Component({
  selector: 'app-histo',
  templateUrl: './histo.component.html',
  styleUrls: ['./histo.component.css']
})
export class HistoComponent implements OnInit {

  currentUser: User;
  lastGames: Game[];
  gamesLoading = true;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.currentUser = getCurrentUser();
    this.gameService.getAll(this.currentUser.id, GameStateEnum.finished, 5).then(
      onsuccess => {this.lastGames = onsuccess; this.gamesLoading = false;}
    )
  }

}
