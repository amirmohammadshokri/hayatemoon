import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';
import { IAddTicket } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TicketingService {
  url: string;

  constructor(private http: HttpClient, private conf: AppConfig) {
    this.url = `${this.conf.getConfig('url')}web/Ticketing`;
  }

  getTickets(page: number, pageSize: number, state: number, userId: number, companyId: number, companyUserId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/Latest?page=${page}&pageSize=${pageSize}
    ${(state ? `&state=${state}` : ``)}
    ${(userId ? `&userId=${userId}` : ``)}
    ${(companyId ? `&companyId=${companyId}` : ``)}
    ${(companyUserId ? `&companyUserId=${companyUserId}` : ``)}
    `);
  }

  addTicket(obj: IAddTicket): Observable<any[]> {
    return this.http.post<any[]>(`${this.url}`, obj);
  }

  unreadTicketCount(): Observable<number> {
    return this.http.get<number>(`${this.url}UnRead/Count`);
  }
}
