import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { ShipService, PositionService } from 'projects/WarGame/src/app/core/api/services';
import { Ship, Game, ShipPosition, User } from 'projects/WarGame/src/app/core/api/models';
import { getLetterFromNumber, getCurrentUser } from 'projects/WarGame/src/app/core/helpers/generic';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  positions: ShipPosition[] = [];
  coloredX: number[] = [];
  coloredY: number[] = [];
  placedShips: Ship[];

  @Input() currentGame: Game;
  @Input() currentUser: User;
  @Output() gameEmitter = new EventEmitter<Game>();

  modalReference: NgbModalRef;
  @ViewChild('modalcontent') modalcontent;
  
  constructor(private modalService: NgbModal, 
    private shipService: ShipService,
    private positionService: PositionService) { }

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
    for (let i = y; i < y + this.currentSizeX ; i++) {
      if(!this.coloredX.includes(i)) this.coloredX.push(i);
      for(let j = x; j < x + this.currentSizeY; j++){
        if(!this.coloredY.includes(j)) this.coloredY.push(j);
      }
    }
  }

  validCurrentShipPlacement(x: number, y:number){
    for (let i = y; i < y + this.currentSizeX ; i++) {
      for(let j = x; j < x + this.currentSizeY; j++){
        let position = new ShipPosition();
        position.gameId = this.currentGame.id;
        position.shipId = this.currentShip.id;
        position.userId = this.currentUser.id;
        position.coordX = j;
        position.coordY = i;
        position.touche = false;
        this.positions.push(position);
      }
    }
    this.initColoredCells();
    this.initCurrentShip();
    if(this.areAllShipPlaced()){
      this.openModal();
    }
  }

  coordinatesInPositions(x: number, y:number) : boolean{
    return (this.positions.find(pos => pos.coordX == x && pos.coordY == y) != null);
  }

  removeShipPositions(id: number){
    this.positions = this.positions.filter(x => x.shipId != id);
  }

  isPlacedShip(id: number){
    return (this.positions.find(x => x.shipId == id) != null);
  }

  areAllShipPlaced(){
    let isOk = true;
    for(let ship of this.ships) {
      if(this.positions.find(x => x.shipId == ship.id) == null){
        isOk = false;
        break;
      }
    }
    return isOk;
  }

  openModal(){
    this.modalReference = this.modalService.open(this.modalcontent);
  }

  closeModal() {
    this.modalReference.close();
    this.cancelLastPlacement();
  }

  validateAllPositions(){
    this.positionService.create(this.positions).then(
      onsuccess => {
        this.modalReference.close();
        this.emitGame(onsuccess);
      }
    )
  }

  cancelLastPlacement(){
    this.positions = this.positions.filter(x => x.shipId != this.currentShip.id);
  }

  emitGame(game: Game): void {
    this.gameEmitter.emit(game);
  }

}
