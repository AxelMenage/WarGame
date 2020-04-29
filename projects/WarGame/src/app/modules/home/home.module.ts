import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeRoutes } from './home.routing';
import { RouterModule } from '@angular/router';
import { StatsComponent } from './components/stats/stats.component';
import { PlayComponent } from './components/play/play.component';
import { HistoComponent } from './components/histo/histo.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DeckComponent } from './components/deck/deck.component';



@NgModule({
  declarations: [HomePageComponent, StatsComponent, PlayComponent, HistoComponent, DeckComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    NgxChartsModule
  ]
})
export class HomeModule { }
