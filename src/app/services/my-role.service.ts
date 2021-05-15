import { Injectable } from '@angular/core';
import {OidcSecurityService} from 'angular-auth-oidc-client'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyRoleService {
  userData$ : Observable<any>
  myRoles:string

  constructor(
    private oidcSecurityService:OidcSecurityService
  ) { 

    this.userData$ = this.oidcSecurityService.userData$
    this.userData$.pipe(map(o => o?.role)).subscribe(
      role => {
        this.myRoles = role
      }
    )

  }

  //checkPermission(role:string): Observable<boolean>{
   // return this.userData$.pipe
  //}


}
