import { Injectable } from '@angular/core';
import {OidcSecurityService} from 'angular-auth-oidc-client'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUserInfo } from '../interfaces';

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
    // this.userData$.pipe(map(o => o?.role)).subscribe(
    //   result => {
    //     this.myRoles = result

    //   }
   // )
  }

  checkPermissionMyRole(role: string): Observable<boolean>{
    return this.userData$.pipe(map(o => o?.role.includes(role)) )
  }

  getUserInfo(): Observable<IUserInfo> {
    return this.userData$.pipe(map(o => {
      return o;
    }) )
  }

  // checkPermession(){
  //   this.userData$.pipe(map(res=> res?.scope)).subscribe(res => 
  //     {
  //       console.log("resFromService", res.array.forEach(element => {
  //         console.log("fromForEach", element)
  //       }))
  //     }
  //     )
  // }


}
