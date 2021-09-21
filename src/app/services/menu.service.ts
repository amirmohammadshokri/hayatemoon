import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  url: string;
  constructor(private http: HttpClient, private conf: AppConfig) {
    this.url = `${this.conf.getConfig('url')}web/`;
  }

  addMenu(obj: any): Observable<any> {
    return this.http.post<any>(`${this.url}menu/new`, obj);
  }

  editMenu(menuId: number, obj: any): Observable<any> {
    return this.http.put<any>(`${this.url}menu/${menuId}`, obj);
  }

  deleteMenu(menuId: number): Observable<any> {
    return this.http.delete<any>(`${this.url}menu/${menuId}`);
  }

  getMenu(menuId: number): Observable<any> {
    return this.http.get<any>(`${this.url}menu/${menuId}`);
  }

  getMenus(): Observable<any> {
    return this.http.get<any>(`${this.url}menu/All`);
  }

  getMenuChildren(menuId: number): Observable<any> {
    return this.http.get<any>(`${this.url}menu/${menuId}/children`);
  }

  setMenuRole(obj: any): Observable<any> {
    return this.http.post<any>(`${this.url}MenuRole`, obj);
  }

  getMenuRoles(companyType: number): Observable<any> {
    return this.http.get<any>(`${this.url}MenuRole/Latest${(companyType >= 0 ? `?companyType=${companyType}` : '')}`);
  }

  setCompanyMenuRole(obj: any): Observable<any> {
    return this.http.post<any>(`${this.url}Company/MenuRole`, obj);
  }

}
