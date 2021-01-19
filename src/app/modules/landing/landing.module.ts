import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { SpecialComponent } from './components/special/special.component';
import { PostingComponent } from './components/posting/posting.component';
import { DownloadComponent } from './components/download/download.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingRoutingModule } from './landing.routing.module';
import { ShareModule } from '../share/share.module';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { AdverService } from 'src/app/services/adver.service';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [MainComponent, DiscoverComponent, SpecialComponent, PostingComponent, DownloadComponent, AboutComponent, FooterComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    ShareModule,
    DropdownModule,
    ButtonModule,
    CarouselModule,
    HttpClientModule,
    TranslateModule
  ],
  providers: [
    AdverService
  ]
})
export class LandingModule { }
