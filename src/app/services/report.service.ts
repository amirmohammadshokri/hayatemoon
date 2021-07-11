import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  url: string;
  constructor(private http: HttpClient, private conf: AppConfig) {
    this.url = `${this.conf.getConfig('url')}web/Report/`;
  }

  companyUser(from: string, to: string, page: number, pageSize: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}CompanyUser/Latest?from=${from}&to=${to}&page=${page}&pageSize=${pageSize}`);
  }

  tour(from: string, to: string, tourType: number, page: number, pageSize: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}Tour/Latest?from=${from}&to=${to}&tourType=${tourType}&page=${page}&pageSize=${pageSize}`);
  }
}
