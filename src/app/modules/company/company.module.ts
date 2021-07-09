import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { ListUserComponent } from './components/list-user/list-user.component';
import { ListCompanyComponent } from './components/list-company/list-company.component';
import { FormCompanyComponent } from './components/form-company/form-company.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
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
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { MultiSelectModule } from 'primeng/multiselect';


@NgModule({
  declarations: [ListUserComponent, ListCompanyComponent, FormCompanyComponent, FormUserComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    InputTextareaModule,
    CommonModule,
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
    CheckboxModule,
    TooltipModule,
    TagModule,
    KeyFilterModule,
    DpDatePickerModule,
    MultiSelectModule
  ],
  providers: [
    ConfirmationService,
    DialogService
  ]
})
export class CompanyModule { }
