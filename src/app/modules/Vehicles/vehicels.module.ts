import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicelsRoutingModule } from './vehicels-routing.module';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { FormVehicelsComponent } from './form-vehicels/form-vehicels.component';
import { ListVehicelsComponent } from './list-vehicels/list-vehicels.component';
import { FieldsetModule } from 'primeng/fieldset';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';


@NgModule({
  declarations: [FormVehicelsComponent,ListVehicelsComponent],
  imports: [
    CommonModule,
    VehicelsRoutingModule,
    DynamicDialogModule,
    CommonModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    InputNumberModule,
    AutoCompleteModule,
    FormsModule,
    ConfirmDialogModule,
    DialogModule,
    FieldsetModule,
    ToolbarModule,
    InputTextModule,
    MultiSelectModule,
  ],
  providers: [
    ConfirmationService,
    DialogService,



  ]
})
export class VehicelsModule { }
