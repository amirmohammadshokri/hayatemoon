import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourRoutingModule } from './tour-routing.module';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { ListTourComponent } from './components/list-tour/list-tour.component';
import { FormTourComponent } from './components/form-tour/form-tour.component';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { MultiSelectModule } from 'primeng/multiselect';
import { FieldsetModule } from 'primeng/fieldset';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [ListTourComponent, FormTourComponent],
  imports: [
    DynamicDialogModule,
    InputTextareaModule,
    CommonModule,
    TourRoutingModule,
    TabViewModule,
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
    CheckboxModule,
    KeyFilterModule,
    DpDatePickerModule,
    MultiSelectModule,
    FieldsetModule,
    TagModule
  ],
  providers: [
    ConfirmationService,
    DialogService
  ]
})
export class TourModule { }
