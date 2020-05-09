import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ship } from '../../models';
import { environment } from 'projects/WarGame/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShipService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Ship[]>(environment.apiUrl + environment.allShipsUrl)
    .toPromise();
  }
}
