import { Component, OnInit, Input } from '@angular/core';
import { User, Game } from 'projects/WarGame/src/app/core/api/models';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {

  @Input() currentUser: User;
  @Input() currentGame: Game;

  constructor() { }

  ngOnInit(): void {
  }

}
