import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ToursComponent } from './components/tours/tours.component';
import { RegistersComponent } from './components/registers/registers.component';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';


@NgModule({
  declarations: [ToursComponent, RegistersComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ToolbarModule,
    TableModule,
    TagModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    DpDatePickerModule
  ]
})
export class ReportsModule { }
