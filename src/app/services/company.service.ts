import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  url: string;

  constructor(private http: HttpClient, private conf: AppConfig) {
    this.url = `${this.conf.getConfig('url')}web/Company`;
  }

  addCompany(obj: any): Observable<any> {
    return this.http.post(`${this.url}`, obj);
  }

  getCompanies(page: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.url}/Latest?page=${page}&pageSize=${pageSize}`);
  }

  getCompanyTypes(): Observable<any> {
    return this.http.get(`${this.url}/Type​/Latest`);
  }

  getCompany(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  editCompany(id: number, obj: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, obj);
  }

  deleteCompany(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  addUser(obj: any): Observable<any> {
    return this.http.post(`${this.url}/User`, obj);
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.url}/User/${id}`);
  }

  edituser(id: number, obj: any): Observable<any> {
    return this.http.put(`${this.url}/User/${id}`, obj);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.url}/User/${id}`);
  }

  getUsers(page: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.url}/User​/Latest?page=${page}&pageSize=${pageSize}`);
  }

}
