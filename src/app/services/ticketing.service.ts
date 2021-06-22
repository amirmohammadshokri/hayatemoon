import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class TicketingService {
  url: string;

  constructor(private http: HttpClient, private conf: AppConfig) {
    this.url = `${this.conf.getConfig('url')}web/`;
  }

  getTicketings(filter: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.url}Ticketing`, filter);
  }


}
