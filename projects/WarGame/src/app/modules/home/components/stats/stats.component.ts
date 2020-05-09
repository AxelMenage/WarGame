import { Component, OnInit } from '@angular/core';
import { UserService } from 'projects/WarGame/src/app/core/api/services';
import { User, UserStatsView } from 'projects/WarGame/src/app/core/api/models';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit{

  single: any[];
  statsLoading = true;

  // options
  gradient: boolean = true;
  showLabels: boolean = false;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#4cb275', '#f64345']
  };

  currentUser: User;
  userStats: UserStatsView;

  constructor(
    private userService: UserService) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) as User;
    this.userService.getStatsByUser(this.currentUser.id).then(
      onsuccess => { 
        this.userStats = onsuccess;
        this.single = [
          {
            "name": "Victoires",
            "value": onsuccess.victories
          },
          {
            "name": "Défaites",
            "value": onsuccess.defeats
          }
        ];
        this.statsLoading = false;
      }
    );
  }
}
