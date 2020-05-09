import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserStatsView } from '../../models';
import { environment } from 'projects/WarGame/src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getStatsByUser(id: number) {
        return this.http.get<UserStatsView>(environment.apiUrl + environment.getUserStatsUrl + "/" + id)
        .toPromise();
    }
}
