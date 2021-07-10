import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class ChanelService {

  url: string;

  constructor(private http: HttpClient, private conf: AppConfig) {
    this.url = `${this.conf.getConfig('url')}web/Channel`;
  }

  addChanel(obj: any): Observable<any> {
    return this.http.post(`${this.url}`, obj);
  }

  getChanel(id: number,): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  editChanel(id: number, obj: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, obj);
  }

  deleteChanel(id: number,): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  getChanels(page: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.url}/Latest?page=${page}&pageSize=${pageSize}`);
  }



}
