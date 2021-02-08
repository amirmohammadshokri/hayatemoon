import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';
import { AdsRoutingModule } from './ads.routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ListComponent } from './components/list/list.component';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdverService } from 'src/app/services/adver.service';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InfoComponent } from './components/info/info.component';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';
import { ErrorInterceptor } from 'src/app/interceptors/error.interceptor';

@NgModule({
  declarations: [ListComponent, InfoComponent
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
    TranslateModule,
    CascadeSelectModule
  ],
  providers: [
    AdverService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class AdsModule { }
