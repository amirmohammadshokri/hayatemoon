import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './components/topbar/topbar.component';
import { AdvCardComponent } from './components/adv-card/adv-card.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { AdsInfoComponent } from './components/ads-info/ads-info.component';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';
import { ErrorInterceptor } from 'src/app/interceptors/error.interceptor';



@NgModule({
  declarations: [
    TopbarComponent,
    AdvCardComponent,
    MainFooterComponent,
    AdsInfoComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    CarouselModule,
    ButtonModule,
    TooltipModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  exports: [
    TopbarComponent,
    AdvCardComponent,
    MainFooterComponent,
    AdsInfoComponent
  ]
})
export class ShareModule { }
