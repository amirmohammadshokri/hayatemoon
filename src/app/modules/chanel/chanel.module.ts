import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChanelRoutingModule } from './chanel-routing.module';
import { ListChanelComponent } from './components/list-chanel/list-chanel.component';
import { FormChanelComponent } from './components/form-chanel/form-chanel.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListChanelComponent, FormChanelComponent],
  imports: [
    CommonModule,
    ChanelRoutingModule,
    ToolbarModule,
    ConfirmDialogModule,
    TableModule,
    InputTextareaModule,
    InputTextModule,
    DropdownModule,
    FormsModule
  ],
  providers: [
    ConfirmationService,
    DialogService
  ]
})
export class ChanelModule { }
