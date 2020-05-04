import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../api/services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            if (currentUser.token && localStorage.getItem('logged')) {
                this.getVerifyToken(currentUser.token, route, state);
            } else {
                this.authenticationService.logout();
                return false;
            }
        } else if (route.url[0].path !== 'login' && route.url[0].path !== 'reinitpassword') {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }
        return true;
    }

    async getVerifyToken(token, route, state) {
        return await this.authenticationService.verifyToken(token).subscribe(
          data => {
            if (route.url.length > 0 && route.url[0].path === 'login') {
              this.router.navigate(['/home']);
              return false;
            } else { return true; }
          },
          err => {
            this.router.navigate(['/login']);
            this.authenticationService.logout();
            return false;
          }
        );
    }
}