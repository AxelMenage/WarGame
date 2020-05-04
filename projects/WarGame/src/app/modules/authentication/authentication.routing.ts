import { Routes } from '@angular/router';
//import { TokenGuard, AuthGuard } from 'src/app/core/guards';

import { LoginComponent } from './login/login.component';
//import { ReinitMDPComponent } from './reinit-mdp/reinit-mdp.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LoginComponent,
        data: {
            title: 'Authentication',
            urls: [
                { title: 'Authentication', url: '/authentication' },
                { title: 'Authentication' }
            ]
        }
      },
      /*{
        path: 'reinit-mdp',
        component: ReinitMDPComponent,
        canActivate : [TokenGuard],
        data: {
          title: 'Réinitialisation mot de passe',
          urls: [
              { title: 'Réinitialisation mot de passe', url: '/reinit-mdp' },
              { title: 'Réinitialisation mot de passe' }
          ]
        }
      }*/
    ]
  }
];
