import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourRoutingModule } from './tour-routing.module';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { ListTourComponent } from './components/list-tour/list-tour.component';
import { FormTourComponent } from './components/form-tour/form-tour.component';



@NgModule({
  declarations: [ListTourComponent, FormTourComponent],
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
