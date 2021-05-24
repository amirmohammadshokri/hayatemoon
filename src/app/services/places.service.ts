import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  url: string;
  constructor(private http: HttpClient, private conf: AppConfig) {
    this.url = `${this.conf.getConfig('url')}web/Places/`;
  }
  addPlace(obj: any): Observable<any> {
    console.log(obj);
    
    return this.http.post<any>(`${this.url}new`, obj);
  }

  getPlaces(pageNumber: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}latest/${pageNumber}`);
  }

  getPlacesBuId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/${id}`);
  }


  editPlaces(id: number, obj: any): Observable<any> {
    return this.http.put<any>(`${this.url}${id}`, obj);
  }

  deletePlace(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}${id}`);
  }

  // Search(verb: string): Observable<any[]> {
  // return this.http.get<any[]>(`${this.conf.getConfig('url')}web/Search/AutoSuggest?search=${verb}`);
  // }


}
