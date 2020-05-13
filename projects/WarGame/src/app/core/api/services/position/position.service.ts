import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/WarGame/src/environments/environment';
import { ShipPosition, Game } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient) { }

  getAllByUserAndGame() {
    return this.http.get<ShipPosition[]>(environment.apiUrl + environment.getPositionByUserAndGameUrl)
    .toPromise();
  }

  create(positions: ShipPosition[]){
    return this.http.post<Game>(environment.apiUrl + environment.positionsUrl, positions)
    .toPromise();
  }
}
