import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConfig } from "../app.config";


@Injectable({
    providedIn: 'root'
  })
  export class BannerService {
    url: string;
  
    constructor(private http: HttpClient, private conf: AppConfig) {
      this.url = `${this.conf.getConfig('url')}web/banner/`;
    }
  
    getBanners(): Observable<any[]> {
      return this.http.get<any[]>(`${this.url}`);
    }
  
    addBanner(obj: any): Observable<any[]> {
      return this.http.post<any[]>(`${this.url}`, obj);
    }
  }
  