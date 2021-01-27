import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private sAuth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // request = request.clone({
    //   // setHeaders: {
    //   //   Authorization: `Bearer ${this.sAuth.getToken()}`,
    //   //   // Accept: '*/*',
    //   //   // 'Access-Control-Allow-Origin': '*',
    //   //   // 'Access-Control-Allow-Credentials': 'true',
    //   // }
    // });
    return next.handle(request);
  }
}
