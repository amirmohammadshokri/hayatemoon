import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  url: string;
  
  constructor(private http: HttpClient, private conf: AppConfig) {
    this.url = `${this.conf.getConfig('url')}web/hotel/`;
  }

  getHotel(pageNumber: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}latest/${pageNumber}`);
  }

  getHotels(pageNumber: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}latest/${pageNumber}`);
  }

  addHotel(obj: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.url}new`, obj);
  }
  
  getHotelType(): Observable<any> {
    return this.http.get<any>(`${this.url}Type/Latest`);
  }
  
}
