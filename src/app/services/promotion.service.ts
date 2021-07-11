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
}
