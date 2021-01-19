import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';
import { AdsRoutingModule } from './ads.routing.module';
import { MainComponent } from './components/main/main.component';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ListComponent } from './components/list/list.component';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdverService } from 'src/app/services/adver.service';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InfoComponent } from './components/info/info.component';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [MainComponent, ListComponent, InfoComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    AdsRoutingModule,
    DropdownModule,
    RadioButtonModule,
    ButtonModule,
    CarouselModule,
    HttpClientModule,
    FormsModule,
    DynamicDialogModule,
    TooltipModule,
    TranslateModule
  ],
  providers: [
    AdverService,
    DialogService
  ]
})
export class AdsModule { }
