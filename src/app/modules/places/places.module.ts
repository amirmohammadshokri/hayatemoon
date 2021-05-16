import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlacesRoutingModule } from './places-routing.module';
import { FormPlacesComponent } from './components/form-places/form-places.component';
import { ListPlacesComponent } from './components/list-places/list-places.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogService } from 'primeng/dynamicdialog';
import { HttpClientInterceptor } from 'src/app/interceptors/http.interceptor';
import { ErrorInterceptor } from 'src/app/interceptors/error.interceptor';
import { ConfirmationService } from 'primeng/api';
import { ChipsModule } from 'primeng/chips';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [FormPlacesComponent, ListPlacesComponent],
  imports: [
    CommonModule,
    PlacesRoutingModule,
    ButtonModule,
    ChipsModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    AutoCompleteModule,
    FormsModule,
    ConfirmDialogModule,
    ToolbarModule
  ],
  providers: [
    ConfirmationService,
    DialogService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }

  ]
})
export class PlacesModule { }
