import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormPromotionComponent } from './components/form-promotion/form-promotion.component';
import { ListPromotionComponent } from './components/list-promotion/list-promotion.component';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { PromotionRoutingModule } from './promotion-routing.module';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { FormPromotionTourComponent } from './components/form-promotion-tour/form-promotion-tour.component';
import {FieldsetModule} from 'primeng/fieldset';
import { AutoCompleteModule } from 'primeng/autocomplete';



@NgModule({
  declarations: [FormPromotionComponent,ListPromotionComponent, FormPromotionTourComponent  ],
  imports: [
    DynamicDialogModule,
    CommonModule,
    PromotionRoutingModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    FormsModule,
    ConfirmDialogModule,
    DialogModule,
    TagModule,
    ToolbarModule,
    FieldsetModule,
    AutoCompleteModule
  
  ],
  providers: [
    ConfirmationService,
    DialogService
  ]
})
export class PromotionModule { }
