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
    private srvOidc: OidcSecurityService
  ) {
    this.showProgressBar = false;
  }

  ngOnInit(): void {
     
    
    this.userData$ = this.srvOidc.userData$;
    console.log(this.srvOidc.userData$,'ffffff');
    
    this.srvOidc.checkAuth().subscribe(d => {
      if (!d) {
        this.srvOidc.authorize();
      } else {
        this.sData.setUserInfo(10);
      }
    });

    this.eventService
      .registerForEvents()
      .pipe(filter((notification) => notification.type === EventTypes.CheckSessionReceived))
      .subscribe((value) => console.log('CheckSessionReceived with value from app', value));

    this.sData.mainProgressBar$.subscribe(res => {
      if (res.length > 0) {
        this.showProgressBar = true;
      } else {
        this.showProgressBar = false;
      }
      this.cdr.detectChanges();
    });

    this.primengConfig.ripple = true;

  }

}
