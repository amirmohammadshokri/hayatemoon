import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  url: string;
  constructor(private http: HttpClient, private conf: AppConfig) {
    this.url = `${this.conf.getConfig('url')}web/Calendar/Holiday/`;
  }

  addCalendar(obj: any): Observable<any> {
    return this.http.post<any>(`${this.url}`, obj);
  }

  getCalendar(pageNumber: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}latest/?page=${pageNumber}&pageSize=10`);
  }

  getCalendarById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}${id}`);
  }

  deleteCalendar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}${id}`);
  }


}
