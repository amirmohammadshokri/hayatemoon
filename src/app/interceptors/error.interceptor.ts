import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { DataService } from '../services';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private sMsg: MessageService, private router: Router, private srvData: DataService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 403) {
        this.router.navigate(['./pages/access']);
      } else {
        const error = err.error.title || err.error.error || err.error?.detail || err.statusText;
        this.srvData.thanksMainProgressBar();
        this.sMsg.add({ severity: 'error', summary: 'توجه', detail: error });
        return throwError(error);
      }
    }));
  }
}
