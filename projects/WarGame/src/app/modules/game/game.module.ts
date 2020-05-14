import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamePageComponent } from './game-page/game-page.component';
import { RouterModule } from '@angular/router';
import { GameRoutes } from './game.routing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from '../../core/helpers/interceptors';
import { PlacementComponent } from './components/placement/placement.component';
import { HandComponent } from './components/hand/hand.component';
import { DrawComponent } from './components/draw/draw.component';
import { ShotComponent } from './components/shot/shot.component';
import { MainScreenComponent } from './components/main-screen/main-screen.component';
import { ShipsStateComponent } from './components/ships-state/ships-state.component';
import { OpponentShotComponent } from './components/opponent-shot/opponent-shot.component';
import { AdminLibModule } from 'admin-lib';
import { MessageComponent } from './components/message/message.component';



@NgModule({
  declarations: [GamePageComponent, PlacementComponent, HandComponent, DrawComponent, ShotComponent, MainScreenComponent, ShipsStateComponent, OpponentShotComponent, MessageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(GameRoutes),
    AdminLibModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
]
})
export class GameModule { }
