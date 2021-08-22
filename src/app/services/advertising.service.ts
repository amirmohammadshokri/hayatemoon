import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class AdvertisingService {
  url: string;

  constructor(private http: HttpClient, private conf: AppConfig) {
    this.url = `${this.conf.getConfig('url')}web/Ads`;
  }

  getAdvertising(page: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.url}/Latest?page=${page}&pageSize=${pageSize}`);
  }

  addAdvertising(obj: any): Observable<any> {
    return this.http.post(`${this.url}`, obj);
  }

  getPageType(): Observable<any> {
    return this.http.get(`${this.url}/PageType/Latest`);
  }

  getPositionType(): Observable<any> {
    return this.http.get(`${this.url}/PositionType/Latest`);
  }


  getAdvertisingById(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  editAdvertising(id: number, obj: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, obj);
  }

  deleteAdvertising(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

}
