import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.css']
})
export class DeckListComponent implements OnInit {

  @Output() deckClickedEmitter = new EventEmitter<number>();
  
  deckList: any[] = [{id: 1, name: "Deck 1"}, {id: 2, name: "Deck 2"}];

  constructor() { }

  ngOnInit(): void {
  }

  public openDeckForm(){

  }

  public trackByFunction(index, item){
    if(!item) return null;
    return item.id
  }

  onDeckClicked(id: number): void {
    this.deckClickedEmitter.emit(id);
  }

}
