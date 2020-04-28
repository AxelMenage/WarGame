import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

export const HomeRoutes: Routes = [
    {
      path: '',
      children: [
        {
          path: '',
          component: HomePageComponent,
          data: {
              title: 'HomePage',
              urls: [
                  { title: 'Home'}
              ]
          }
        }
      ]
    }
  ];
  