import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/app.config';
import { ILogin, IRegister, IUserUpdate } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string;

  constructor(private http: HttpClient, private router: Router, private conf: AppConfig) {
    this.url = `${this.conf.getConfig('url')}`;
  }

  public login(model: ILogin): Observable<any> {
    return this.http.post<any>(`${this.url}auth/local`, model);
  }

  public register(model: IRegister): Observable<any> {
    return this.http.post<any>(`${this.url}auth/local/register`, model);
  }

  public getUserInfo(): Observable<any> {
    return this.http.get<any>(`${this.url}users/me`);
  }

  public confirmEmail(confirmation: string): Observable<any> {
    return this.http.get<any>(`${this.url}auth/email-confirmation?confirmation=${confirmation}`);
  }

  public forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.url}auth/forgot-password`, {
      email,
      url: `https://${window.location.hostname}/auth/forgot-password`
    });
  }

  public resetPassword(code: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.url}auth/reset-password`, {
      code,
      password,
      passwordConfirmation: password
    });
  }

  public updateUser(userId: number, model: IUserUpdate): Observable<any> {
    return this.http.put<any>(`${this.url}users/${userId}`, model);
  }

  getToken(): string {
    return document.cookie.substr(4, document.cookie.length);
  }

  logout(): void {
    this.setCookie('jwt', '', -1);
    this.router.navigate(['/auth']);
  }

  setCookie(cname: string, value: string, todays: number): void {
    const d = new Date();
    d.setTime(d.getTime() + (todays * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + value + ';' + expires + ';path=/';
    document.cookie = cname + '=' + value + ';' + expires + ';path=/en';
    document.cookie = cname + '=' + value + ';' + expires + ';path=/tr';
  }

}
