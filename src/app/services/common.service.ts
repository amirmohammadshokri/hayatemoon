import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';
 

@Injectable({
    providedIn: 'root'
  })
  export class CommonServiece{
    getMenuWithReportId(reportId: any) {
      throw new Error('Method not implemented.');
    }
    url: string;
    constructor(private http: HttpClient) {
        this.url = `assets/`;
      }
   
    public getIcons(): Observable<SelectItem[]> {
        return this.http.get<SelectItem[]>(this.url+'awsomIcons.json');
      }
  }
