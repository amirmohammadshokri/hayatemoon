import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  url: string;
  constructor(private http: HttpClient, private conf: AppConfig) {
    this.url = `${this.conf.getConfig('url')}web/Promotion`;
  }


  promotions(page: number, pageSize: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/Latest${page ? `?page=${page}&pageSize=${pageSize}` : ``}`);
  }

  getpromotions(filter: string, pageNumber: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/latest?page=${pageNumber}${(filter ? `&${filter}` : ``)}`);
  }

  addpromotion(obj: any): Observable<any> {
    console.log(obj);
    
    return this.http.post<any>(`${this.url}`, obj);
  }

  getpromotionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  getpromotionTourById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/'Tour'/${id}`);
  }

  editpromotion(id: number, obj: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, obj);
  }

  deletepromotion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
