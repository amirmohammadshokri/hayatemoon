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
    TooltipModule
  ],
  exports: [
    TopbarComponent,
    AdvCardComponent,
    MainFooterComponent,
    AdsInfoComponent
  ]
})
export class ShareModule { }
