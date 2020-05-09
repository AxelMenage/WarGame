import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService, GameService } from '../../api/services';

@Injectable({ providedIn: 'root' })
export class GameGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private gameService: GameService
    ) { }

    canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
        if(route.queryParams.id === undefined){
            this.router.navigate(['/home']);
            return Promise.resolve(false);
        } 
        return new Promise((resolve) => {
            this.gameService.canAccess(route.queryParams.id, this.authenticationService.currentUserValue.id).then(
                (onsuccess: boolean) => {
                resolve(true);
              })
              .catch(err => {
                this.router.navigate(['/home']);
                resolve(false);
              });
            })
    }
}