import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBike } from '../bike';

@Injectable({
  providedIn: 'root'
})
export class BikeService {

  private base_url = environment.api_url;

  constructor(private http: HttpClient) { }

  getBikes(): Observable<IBike[]> {
    return this.http.get<IBike[]>(`${this.base_url}/bikes/`);
  }

  
  getBike(id): Observable<IBike[]> {
    return this.http.get<IBike[]>(`${this.base_url}/bikes/:id`);
  }

  createBike(serialNumber: string, model: string, type: string, imageUrl : string): Observable<IBike> {
    return this.http.post<IBike>(`${this.base_url}/bikes/`, { serialNumber, model, type, imageUrl });
  }

  deleteBike(id: string): Observable<any> {
    return this.http.delete(`${this.base_url}/bikes/${id}`);
  }
}