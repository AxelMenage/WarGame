import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  mode: number = 0;
  modeName: string = "Classique";

  constructor() { }

  ngOnInit(): void {
  }

  onModeChange(mode: number){
    this.mode = mode;
    console.log(mode);
    switch(mode){
      case 0 : 
        this.modeName = "Classique";
        break; 
      case 1 : 
        this.modeName = "Cartes";
        break; 
      default:
        break; 
    }
  }

}
