import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private base_url = environment.api_url1;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.base_url}/`);
  }

  getUser(username): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.base_url}/:username`);
  }

  deleteUser(username: string): Observable<any> {
    return this.http.delete(`${this.base_url}/${username}`);
  }
}
