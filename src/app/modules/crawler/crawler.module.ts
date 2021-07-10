import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrawlerRoutingModule } from './crawler-routing.module';
import { CrawlersComponent } from './components/crawlers/crawlers.component';
import { CarouselModule } from 'primeng/carousel';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [CrawlersComponent],
  imports: [
    CommonModule,
    CrawlerRoutingModule,
    CarouselModule,
    AutoCompleteModule,
    ButtonModule
  ]
})
export class CrawlerModule { }
