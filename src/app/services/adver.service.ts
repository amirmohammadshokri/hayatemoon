import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdverService {

  url: string;
  constructor(private http: HttpClient) {
  }

  public getData(): Observable<any[]> {
    return this.http.get<any[]>('assets/products-small.json');
  }
}
