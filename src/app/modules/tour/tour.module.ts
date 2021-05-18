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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { HttpClientInterceptor } from 'src/app/interceptors/http.interceptor';
import { ErrorInterceptor } from 'src/app/interceptors/error.interceptor';
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
    FieldsetModule
  ],
  providers: [
    ConfirmationService,
    DialogService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class TourModule { }
