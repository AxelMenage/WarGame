import { Component, OnInit } from '@angular/core';
import { ShipService } from 'projects/WarGame/src/app/core/api/services';
import { Ship } from 'projects/WarGame/src/app/core/api/models';
import { getLetterFromNumber } from 'projects/WarGame/src/app/core/helpers/generic';

@Component({
  selector: 'app-placement',
  templateUrl: './placement.component.html',
  styleUrls: ['./placement.component.css']
})
export class PlacementComponent implements OnInit {

  ships: Ship[];
  loading: boolean = true;
  currentShip: Ship = new Ship();
  currentSizeX: number = 0;
  currentSizeY: number = 0;
  positions: Position[] = [];
  coloredX: number[] = [];
  coloredY: number[] = [];
  
  constructor(private shipService: ShipService) { }

  ngOnInit(): void {
    this.shipService.getAll().then(
      onsuccess => this.ships = onsuccess
    ).then(() => this.loading = false)
  }

  counter(i: number) {
    return new Array(i);
  }

  getLetter(n: number){
    return getLetterFromNumber(n);
  }

  setCurrentShip(id: number){
    this.initColoredCells();
    if(this.currentShip.id == id){
      this.initCurrentShip();
    }else{
      this.updateCurrentShip(id);
    }
  }

  initCurrentShip(){
    this.currentShip = new Ship();
    this.currentSizeX = 0;
    this.currentSizeY = 0;
  }

  initColoredCells(){
    this.coloredX = [];
    this.coloredY = [];
  }

  updateCurrentShip(id: number){
    this.currentShip = this.ships.find(x => x.id == id);
    this.currentSizeX = this.currentShip.sizeX;
    this.currentSizeY = this.currentShip.sizeY;
  }

  rotateCurrentShip(){
    let tempX = this.currentSizeX;
    this.currentSizeX = this.currentSizeY;
    this.currentSizeY = tempX;
    this.initColoredCells();
  }

  displayShipEmplacement(x: number, y:number){
    this.initColoredCells();
    console.log("x:" + x + "y:" + y);
    console.log("currentx:" + this.currentSizeX + "currenty:" + this.currentSizeY);
    for (let i = y; i < y + this.currentSizeX ; i++) {
      if(!this.coloredX.includes(i)) this.coloredX.push(i);
      for(let j = x; j < x + this.currentSizeY; j++){
        if(!this.coloredY.includes(j)) this.coloredY.push(j);
      }
    }
    console.log(this.coloredX);
    console.log(this.coloredY);
  }

}
