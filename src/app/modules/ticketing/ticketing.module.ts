import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketingRoutingModule } from './ticketing-routing.module';
import { ListTicketsComponent } from './components/list-tickets/list-tickets.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { ChipsModule } from 'primeng/chips';
import { FormTicketComponent } from './components/form-ticket/form-ticket.component';


@NgModule({
  declarations: [ListTicketsComponent, FormTicketComponent],
  imports: [
    CommonModule,
    TicketingRoutingModule,
    ButtonModule,
    ChipsModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    AutoCompleteModule,
    FormsModule,
    ConfirmDialogModule,
    ToolbarModule
  ],
  providers: [
    ConfirmationService,
    DialogService
  ]
})
export class TicketingModule { }
