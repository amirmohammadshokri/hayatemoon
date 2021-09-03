import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  url: string;
  constructor(private http: HttpClient, private conf: AppConfig) {
    this.url = `${this.conf.getConfig('url')}web/Search/`;
  }

  getLocation(verb: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}AutoSuggest/Location?search=${verb}`);
  }

  getHotelFacilitiesKind(verb: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}AutoSuggest/HotelFacilitiesKind?search=${verb}`);
  }

  getResidenceFacilitiesKind(verb: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}AutoSuggest/ResidenceFacilitiesKind?search=${verb}`);
  }

  getHotelRoomKind(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}AutoSuggest/HotelRoomKind`);
  }

  getHotelRoomFacilitiesKind(verb: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}AutoSuggest/HotelRoomFacilitiesKind?search=${verb}`);
  }

  getPlaces(verb: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}AutoSuggest/Place?search=${verb}`);
  }

  getToueCategories(verb: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}AutoSuggest/TourCategoryKind?search=${verb}`);
  }

  getHotel(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}AutoSuggest/Hotel`);
  }

  getHotelRooms(hotelId: number, verb: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}AutoSuggest/HotelRoomKind?search=${verb}${hotelId ? `&hotelId=${hotelId}` : ``}`);
  }

  getHotelRoom(verb: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}AutoSuggest/HotelRoomKind?search=${verb}`);
  }

  getCompanySaerch(verb: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}AutoSuggest/Companies?search=${verb}`);
  }

  getMenu(verb: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}Menu/AutoSuggest?search=${verb}`);
  }

  getTour(verb: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}AutoSuggest/Tour?search=${verb}`);
  }
}
