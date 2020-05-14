import { Component, OnInit } from '@angular/core';
import { getLetterFromNumber } from 'projects/WarGame/src/app/core/helpers/generic';

@Component({
  selector: 'app-opponent-shot',
  templateUrl: './opponent-shot.component.html',
  styleUrls: ['./opponent-shot.component.css']
})
export class OpponentShotComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  counter(i: number) {
    return new Array(i);
  }

  getLetter(n: number){
    return getLetterFromNumber(n);
  }

}
