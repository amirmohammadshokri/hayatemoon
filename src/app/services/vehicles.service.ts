import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  url: string;
  constructor(private http: HttpClient, private conf: AppConfig) {
    this.url = `${this.conf.getConfig('url')}web/Vehicles/`;
  }

  addVehicle(obj:any): Observable<any> {
    return this.http.post<any>(`${this.url}`,obj);
  }

  getVehicles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}latest`);
  }
  getVehicle(page: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}latest?page=${page}`);
  }

  deleteVehicles(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}${id}`);
  }

  getVehiclesById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}${id}`);
  }

   
}
