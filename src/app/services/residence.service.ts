import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';
import { IResidence } from '../interfaces/residence.iterface';

@Injectable({
  providedIn: 'root'
})

export class ResidenceService {
  url: string;

  constructor(private http: HttpClient, private conf: AppConfig) {
    this.url = `${this.conf.getConfig('url')}web/Residence/`;
  }
  //#region Residence
  getResidence(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}Registered/${id}`);
  }

  getResidences(filter: string, pageNumber: number): Observable<IResidence[]> {
    return this.http.get<IResidence[]>(`${this.url}Registered/latest${filter}`);
  }

  addResidence(obj: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.url}`, obj);
  }

  deleteResidence(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}${id}`);
  }

  //#endregion
  //#region  Residencefacilitieskind
  getResidencefacilitieskind(page: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}FacilitiesKind/latest?page=${page}`);
  }

  addResidencefacilitieskind(obj: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.url}FacilitiesKind`, obj);
  }

  deleteResidencefacilitieskind(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}FacilitiesKind/${id}`);
  }

  getResidencefacilitieskindById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}FacilitiesKind/${id}`);
  }
  //#endregion
}
