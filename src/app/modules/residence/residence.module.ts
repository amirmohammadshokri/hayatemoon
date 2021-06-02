import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResidenceRoutingModule } from './residence-routing.module';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { FormResidencefacilitieskindComponent } from './components/form-residencefacilitieskind/form-residencefacilitieskind.component';
import { ListResidencefacilitieskindComponent } from './components/list-residencefacilitieskind/list-residencefacilitieskind.component';
import { FormResidenceComponent } from './components/form-residence/form-residence.component';
import { ListResidenceComponent } from './components/list-residence/list-residence.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ChipsModule } from 'primeng/chips';
import { ListCalendarComponent } from './components/list-calendar/list-calendar.component';
import { FormCalendarComponent } from './components/form-calendar/form-calendar.component';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { FieldsetModule } from 'primeng/fieldset';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [FormResidencefacilitieskindComponent, ListResidencefacilitieskindComponent,
    FormResidenceComponent, ListResidenceComponent, ListCalendarComponent,
    FormCalendarComponent],
  imports: [
    CommonModule,
    ResidenceRoutingModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    AutoCompleteModule,
    FormsModule,
    LeafletModule,
    InputTextareaModule,
    ConfirmDialogModule,
    RadioButtonModule,
    ToolbarModule,
    ChipsModule,
    DpDatePickerModule,
    FieldsetModule,
    TooltipModule,
    DialogModule,
    TagModule
  ],
  providers: [
    ConfirmationService,
    DialogService
  ]
})

export class ResidenceModule { }
