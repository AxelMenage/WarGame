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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from '../../core/helpers/interceptors';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminLibModule } from 'admin-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrentGamesComponent } from './components/current-games/current-games.component';



@NgModule({
  declarations: [HomePageComponent, StatsComponent, PlayComponent, HistoComponent, DeckComponent, CurrentGamesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    NgxChartsModule,
    NgbModule,
    AdminLibModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
]
})
export class HomeModule { }
