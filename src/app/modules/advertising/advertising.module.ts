import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvertisingRoutingModule } from './advertising-routing.module';
import { FormAdvertisingComponent } from './components/form-advertising/form-advertising.component';
import { ListAdvertisingComponent } from './components/list-advertising/list-advertising.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { MultiSelectModule } from 'primeng/multiselect';


@NgModule({
  declarations: [FormAdvertisingComponent, ListAdvertisingComponent],
  imports: [
    CommonModule,
    AdvertisingRoutingModule,
    CommonModule,
    InputTextareaModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    AutoCompleteModule,
    ToolbarModule,
    FormsModule,
    InputTextareaModule,
    ConfirmDialogModule,
    RadioButtonModule,
    DialogModule,
    TooltipModule,
    TagModule,
    KeyFilterModule,
    DpDatePickerModule,
    MultiSelectModule
  ]
})
export class AdvertisingModule { }
