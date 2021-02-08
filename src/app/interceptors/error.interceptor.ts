import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  imOut: boolean;

  constructor(private sAuth: AuthService, private sMsg: MessageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401 && !this.imOut) {
        // this.sMsg.add({ severity: 'warn', summary: 'هشدار دسترسی', detail: 'جهت امنیت اطلاعات لطفا دوباره وارد شوید .' });
        this.imOut = true;
        this.sAuth.logout();
      }
      const error = err.error?.message || err.statusText;
      if (error) {
        error[0].messages.forEach(msg => {
          this.sMsg.add({ severity: 'warn', summary: 'warning', detail: msg.message });
        });
      }
      return throwError(error);
    }));
  }
}
