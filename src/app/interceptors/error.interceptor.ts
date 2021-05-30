import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { DataService } from '../services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private sMsg: MessageService, private srvData: DataService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      const error = err.error.title || err.error.error || err.error?.detail || err.statusText;
      this.srvData.thanksMainProgressBar();
      this.sMsg.add({ severity: 'error', summary: 'توجه', detail: error });
      return throwError(error);
    }));
  }
}
