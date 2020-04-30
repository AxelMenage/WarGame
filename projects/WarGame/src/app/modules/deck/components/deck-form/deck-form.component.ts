import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-deck-form',
  templateUrl: './deck-form.component.html',
  styleUrls: ['./deck-form.component.css']
})
export class DeckFormComponent implements OnChanges {

  displayForm: boolean = false;

  deckForm = new FormGroup({
    name: new FormControl(1),
    shot: new FormControl(0),
    bomb: new FormControl(0),
    scan: new FormControl(0),
    repair: new FormControl(0),
    camouflage: new FormControl(0),
    shield: new FormControl(0),
  });
  
  @Input() deckId: number;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if(changes.deckId.currentValue != null){
      this.displayForm = true;
    }
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.deckForm.value);
  }

}
