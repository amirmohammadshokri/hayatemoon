import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  url: string;

  constructor(private http: HttpClient, private conf: AppConfig) {
    this.url = `${this.conf.getConfig('url')}web/media/`;
  }

  getMediaById(mediaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/${mediaId}`);
  }

  getMedia(mediaId: number): Observable<any[]> {
    return this.http.delete<any[]>(`${this.url}/${mediaId}`);
  }

  upload(obj: any, type: number): Observable<any> {
    return this.http.post<any>(`${this.url}upload?uploadMediaType=${type}`, obj);
  }

}
