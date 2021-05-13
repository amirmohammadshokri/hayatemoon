import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConfig } from "../app.config";


@Injectable({
    providedIn: 'root'
  })
  export class SettingService {
    url: string;
  
    constructor(private http: HttpClient, private conf: AppConfig) {
      this.url = `${this.conf.getConfig('url')}web/Setting/`;
    }
  
    addSetting(obj: any): Observable<any[]> {
      return this.http.post<any[]>(`${this.url}set`, obj);
    }
  }
  