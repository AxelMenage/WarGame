import { Routes } from '@angular/router';
import { DeckPageComponent } from './deck-page/deck-page.component';

export const DeckRoutes: Routes = [
    {
      path: '',
      children: [
        {
          path: '',
          component: DeckPageComponent,
          data: {
              title: 'DeckPage',
              urls: [
                  { title: 'Deck'}
              ]
          }
        }
      ]
    }
  ];