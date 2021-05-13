import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';
import { IHotel } from '../interfaces/hotel.interface';
import { IHotelfacilitieskind } from '../interfaces/hotelfacilitieskind.interface';
import { IRoomfacilitieskind } from '../interfaces/roomfacilitieskind.interface';
import { IRoomkind } from '../interfaces/roomkind.interface';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  url: string;

  constructor(private http: HttpClient, private conf: AppConfig) {
    this.url = `${this.conf.getConfig('url')}web/hotel/`;
  }

  getHotel(pageNumber: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}latest/${pageNumber}`);
  }

  getHotels(filter: string, pageNumber: number): Observable<IHotel[]> {
    return this.http.get<IHotel[]>(`${this.url}Registered/latest${filter}`);
  }

  addHotel(obj: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.url}new`, obj);
  }

  getHotelType(): Observable<any> {
    return this.http.get<any>(`${this.url}Type/Latest`);
  }

  deleteHotel(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}${id}`);
  }
  //roomkindService
  //#region
  getRoomkind(): Observable<IRoomkind[]> {
    return this.http.get<IRoomkind[]>(`${this.url}Room/Kind/latest`);
  }
  addRomkind(obj: any): Observable<any[]> {
    console.log(obj);

    return this.http.post<any[]>(`${this.url}Room/Kind`, obj);
  }
  deleteRoomkind(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}Room/Kind/${id}`);
  }
  //#endregion
  //#region  romfacilikind
  getRoomfacilitieskind(): Observable<IRoomfacilitieskind[]> {
    return this.http.get<IRoomfacilitieskind[]>(`${this.url}Room/FacilitiesKind/latest`);
  }
  addRoomfacilitieskind(obj: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.url}Room/FacilitiesKind`, obj);
  }
  deleteRoomfacilitieskind(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}Room/FacilitiesKind/${id}`);
  }
  //#endregion
  //#region hotelfacilikind
  getHotelfacilitieskind(): Observable<IHotelfacilitieskind[]> {
    return this.http.get<IHotelfacilitieskind[]>(`${this.url}FacilitiesKind/latest`);
  }
  addHotelfacilitieskind(obj: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.url}FacilitiesKind`, obj);
  }
  deleteHotelfacilitieskind(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}FacilitiesKind/${id}`);
  }
  //#endregion

}
