import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'ss-accessdenied',
  templateUrl: './accessdenied.component.html',
  styleUrls: ['./accessdenied.component.scss']
})
export class AccessdeniedComponent implements OnInit {

  constructor(private srvOidc: OidcSecurityService) { }

  ngOnInit(): void {
  }

  signOut() {
    this.srvOidc.logoff()
  }

}
