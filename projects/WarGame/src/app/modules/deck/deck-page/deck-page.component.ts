import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deck-page',
  templateUrl: './deck-page.component.html',
  styleUrls: ['./deck-page.component.css']
})
export class DeckPageComponent implements OnInit {

  public clickedDeckId: number;

  displayDeckForm: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  childDeckClicked(id: number) {
    this.clickedDeckId = id;
  }


}
