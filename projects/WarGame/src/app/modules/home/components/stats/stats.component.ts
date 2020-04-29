import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {

  single: any[];

  // options
  gradient: boolean = true;
  showLabels: boolean = false;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#4cb275', '#f64345']
  };

  constructor() {
    this.single = [
      {
        "name": "Victoires",
        "value": 50
      },
      {
        "name": "Défaites",
        "value": 25
      }
    ];
  }
}
