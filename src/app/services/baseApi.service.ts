import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';
@Injectable({
  providedIn: 'root'
})

export class BaseApiService {
  url: string;

  constructor(private http: HttpClient, private conf: AppConfig) {
    this.url = `${this.conf.getConfig('url')}web/Location/`;
  }

  getLocations(pageNumber: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}latest/${pageNumber}`);
  }

  getLocationById(locationId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/${locationId}`);
  }

  getProvinces(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}Province`);
  }

  getProvinceById(provinceId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/Province/${provinceId}/Cities`);
  }



}
