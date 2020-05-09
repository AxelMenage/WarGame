import { Injectable } from '@angular/core';
import { environment } from 'projects/WarGame/src/environments/environment';
import { Game } from '../../models/game.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  get(id: number) {
    return this.http.get<Game>(environment.apiUrl + environment.gamesUrl + "/" + id)
    .toPromise();
  }

  getAll(id: number, stateId: number, limit: number = 0) {
    return this.http.get<Game[]>(environment.apiUrl + environment.getGamesUrl + "/" + id 
    + "?stateId=" + stateId + "&limit=" + limit)
    .toPromise();
  }

  create(game: Game){
    return this.http.post<Game>(environment.apiUrl + environment.gamesUrl, game)
    .toPromise();
  }

  update(game: Game){
    return this.http.post<Game>(environment.apiUrl + environment.gamesUrl, game)
    .toPromise();
  }

  changeState(id: number, stateId: number){
    return this.http.put<Game>(environment.apiUrl + environment.changeGameStateUrl + "/" + id, stateId)
    .toPromise();
  }

  delete(id: number){
    return this.http.delete<boolean>(environment.apiUrl + environment.gamesUrl + "/" + id)
    .toPromise();
  }

  canAccess(id: number, userId: number) {
    return this.http.get<boolean>(environment.apiUrl + environment.canAccessGameUrl + "/" + id 
    + "?userId=" + userId)
    .toPromise();
  }
}
