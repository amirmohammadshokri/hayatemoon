import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';


@Injectable({
  providedIn: 'root'
})
export class TourService {
  url: string;

  constructor(private http: HttpClient, private conf: AppConfig) {
    this.url = `${this.conf.getConfig('url')}web/tour`;
  }

  getTours(filter: string, pageNumber: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/Registered/latest?page=${pageNumber}${(filter !== `` ? `&${filter}` : ``)}`);
  }

  getTour(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/Registered/${id}`);
  }

  addTour(obj: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.url}`, obj);
  }

  editTour(obj: any): Observable<any[]> {
    return this.http.put<any[]>(`${this.url}`, obj);
  }

  getTourType(): Observable<any> {
    return this.http.get<any>(`${this.url}/type`);
  }

  getCategories(pageNumber: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/CategoryKind/Latest${(pageNumber ? `?page=${pageNumber}` : ``)}`);
  }

}
