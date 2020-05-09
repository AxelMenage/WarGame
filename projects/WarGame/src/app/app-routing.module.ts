import { Routes } from '@angular/router';
import { LayoutBlankComponent } from './layouts/layout-blank/layout-blank.component';
import { LayoutFullComponent } from './layouts/layout-full/layout-full.component';
import { NotFoundComponent } from 'admin-lib';
import { AuthGuard, GameGuard } from './core/helpers/guards';

export const Approutes: Routes = [
    {
      path: '',
      component: LayoutFullComponent,
      children: [
        { path: '', redirectTo: '/home', pathMatch: 'full' },
        {
          path: 'home',
          canActivate: [AuthGuard],
          loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
        },
        {
          path: 'decks',
          canActivate: [AuthGuard],
          loadChildren: () => import('./modules/deck/deck.module').then(m => m.DeckModule)
        },
        {
          path: 'game',
          canActivate: [AuthGuard, GameGuard],
          loadChildren: () => import('./modules/game/game.module').then(m => m.GameModule)
        }
      ]
    },
    {
      path: '',
      component: LayoutBlankComponent,
      children: [
        {
          path: 'login',
          canActivate: [AuthGuard],
          loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
        },
        {
          path: '404',
          component: NotFoundComponent
        }
      ]
    },
    {
      path: '**',
      redirectTo: '/404'
    }
  ];
  