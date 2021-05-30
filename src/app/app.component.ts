import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EventTypes, OidcSecurityService, PublicEventsService } from 'angular-auth-oidc-client';
import { PrimeNGConfig } from 'primeng/api';
import { filter } from 'rxjs/operators';
import { DataService } from './services/data.service';

@Component({
  selector: 'ss-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showProgressBar: boolean;
  userData$: any;

  constructor(
    private primengConfig: PrimeNGConfig,
    private sData: DataService,
    private cdr: ChangeDetectorRef,
    private eventService: PublicEventsService,
    private oidcSecurityService: OidcSecurityService
  ) {
    this.showProgressBar = false;
  }

  ngOnInit(): void {

    this.userData$ = this.oidcSecurityService.userData$;
    this.oidcSecurityService.checkAuth().subscribe(d => {
      if (!d) {
        this.oidcSecurityService.authorize();
      }
    });

    this.eventService
      .registerForEvents()
      .pipe(filter((notification) => notification.type === EventTypes.CheckSessionReceived));
    this.primengConfig.ripple = true;
    this.sData.mainProgressBar.subscribe(res => {
      if (res.length > 0) {
        this.showProgressBar = true;
      } else {
        this.showProgressBar = false;
      }
      this.cdr.detectChanges();
    });
  }

  login(): void {
    this.oidcSecurityService.authorize();
  }

  logout(): void {
    this.oidcSecurityService.logoff();
  }

}
