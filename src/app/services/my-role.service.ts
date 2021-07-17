import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUserInfo } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class MyRoleService {
  userData$: Observable<any>
  myRoles: string

  constructor(private oidcSecurityService: OidcSecurityService) {
    this.userData$ = this.oidcSecurityService.userData$
  }

  checkPermissionMyRole(role: string): Observable<boolean> {
    return this.userData$.pipe(map(o => o?.role.includes(role)))
  }

  getUserInfo(): Observable<any> {
    return this.userData$.pipe(map(o => {
      console.log(o);
      
      return o;
    }));
  }

}
