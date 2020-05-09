import { Routes } from '@angular/router';
import { GamePageComponent } from './game-page/game-page.component';

export const GameRoutes: Routes = [
    {
      path: '',
      children: [
        {
          path: '',
          component: GamePageComponent,
          data: {
              title: 'GamePage',
              urls: [
                  { title: 'Game'}
              ]
          }
        }
      ]
    }
  ];