import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { MenuComponent } from './components/menu/menu.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { PanelRoutingModule } from './panel.routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInterceptor } from 'src/app/interceptors/http.interceptor';
import { ErrorInterceptor } from 'src/app/interceptors/error.interceptor';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TooltipModule } from 'primeng/tooltip';
import { BadgeModule } from 'primeng/badge';

@NgModule({
  declarations: [
    LayoutComponent,
    MenuComponent,
    TopbarComponent
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    InputTextModule,
    DropdownModule,
    HttpClientModule,
    FormsModule,
    ButtonModule,
    RatingModule,
    TooltipModule,
    BadgeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class PanelModule { }
