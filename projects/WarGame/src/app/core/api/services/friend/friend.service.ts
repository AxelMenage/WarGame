import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Friend } from '../../models';
import { environment } from 'projects/WarGame/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private http: HttpClient) { }

  getFriends(id: number) {
    return this.http.get<Friend[]>(environment.apiUrl + environment.friendsUrl + "/" + id)
    .toPromise();
  }
}
