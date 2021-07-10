import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class CrawlerService {
  url: string;

  constructor(private http: HttpClient, private conf: AppConfig) {
    this.url = `${this.conf.getConfig('url')}web/Crawler/Rout`;
  }

  addRout(obj: any): Observable<any> {
    return this.http.post(`${this.url}`, obj);
  }

  getRouts(): Observable<any> {
    return this.http.get(`${this.url}/Latest`);
  }
}
