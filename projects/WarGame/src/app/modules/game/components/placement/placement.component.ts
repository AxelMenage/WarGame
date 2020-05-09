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

}
