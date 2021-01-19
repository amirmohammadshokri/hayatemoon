import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'sc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  suportlanguage = ['en', 'fa', 'tr'];

  constructor(private primengConfig: PrimeNGConfig, private translateService: TranslateService) {
    this.translateService.addLangs(this.suportlanguage);
    this.translateService.setDefaultLang('en');
    const browserlang = this.translateService.getBrowserLang();
    this.translateService.use(browserlang);
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
