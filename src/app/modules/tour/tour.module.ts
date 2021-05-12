import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';
import { TourRoutingModule } from './tour-routing.module';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ListComponent, FormComponent],
  imports: [
    CommonModule,
    TourRoutingModule,
    TabViewModule,
    ButtonModule,
    InputNumberModule,
    InputTextModule,
    DropdownModule,
    RadioButtonModule,
    FormsModule
  ]
})
export class TourModule { }
