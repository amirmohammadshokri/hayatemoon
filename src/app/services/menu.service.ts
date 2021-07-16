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
    this.url = `${this.conf.getConfig('url')}web/menu/`;
  }

  addMenu(obj: any): Observable<any> {
    return this.http.post<any>(`${this.url}new`, obj);
  }

  editMenu(menuId: number, obj: any): Observable<any> {
    return this.http.put<any>(`${this.url}${menuId}`, obj);
  }

  deleteMenu(menuId: number): Observable<any> {
    return this.http.delete<any>(`${this.url}${menuId}`);
  }

  getMenu(menuId: number): Observable<any> {
    return this.http.get<any>(`${this.url}${menuId}`);
  }

  getMenus(): Observable<any> {
    return this.http.get<any>(`${this.url}All`);
  }

  getMenuChildren(menuId: number): Observable<any> {
    return this.http.get<any>(`${this.url}${menuId}/children`);
  }

}
