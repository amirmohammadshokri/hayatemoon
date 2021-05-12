import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConfig } from "../app.config";
import { IAddTour } from "../interfaces";
 

@Injectable({
    providedIn: 'root'
  })
  export class TourService {
    url: string;
  
    constructor(private http: HttpClient, private conf: AppConfig) {
      this.url = `${this.conf.getConfig('url')}web/tour/`;
    }
  
    getTours(pageNumber: number): Observable<any[]> {
      return this.http.get<any[]>(`${this.url}latest/${pageNumber}`);
    }
  
    addTour(obj: any): Observable<any[]> {
      return this.http.post<any[]>(`${this.url}new`, obj);
    }
    
    getTourType(): Observable<any> {
      return this.http.get<any>(`${this.url}type`);
    }

  
  }
  