import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  url: string;

  constructor(private http: HttpClient, private conf: AppConfig) {
    this.url = `${this.conf.getConfig('url')}web/Identity/`;
  }

  getPermissions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}Permission/latest`);
  }

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}Role/latest`);
  }
}
