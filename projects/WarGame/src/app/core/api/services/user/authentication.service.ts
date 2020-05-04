import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'projects/WarGame/src/environments/environment';
import { User, Token } from '../../models';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private authError: any;

    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(nickname: string, password: string, rememberme: boolean) {
        return this.http.post<any>(`${environment.apiUrl + environment.authenticationUrl}`, { nickname, password })
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('logged', '1');
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('logged');
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
        return true;
    }

    getAuthError() {
        return this.authError;
      }
    
      forgotPassword(mail: string) {
        return this.http
          .post<any>(environment.apiUrl + environment.forgotPasswordUrl, { mail })
          .pipe(
            map(response => {
              return response;
            })
          );
      }
    
      reinitPassword(user: User, oldPassword: string) {
        return this.http
          .post<any>(environment.apiUrl + environment.reinitPasswordUrl, {
            user,
            oldPassword
          })
          .pipe(
            map(response => {
              return response;
            })
          );
      }
    
      verifyToken(userToken: string) {
        const token = new Token(userToken);
        return this.http.post<any>(
          environment.apiUrl + environment.verifyTokenUrl, token
        );
      }
}