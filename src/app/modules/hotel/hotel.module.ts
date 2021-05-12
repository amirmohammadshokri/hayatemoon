import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelRoutingModule } from './hotel-routing.module';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { HotelFromComponent } from './components/hotel-from/hotel-from.component';
import { HotelListComponent } from './components/hotel-list/hotel-list.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [HotelFromComponent, HotelListComponent],
  imports: [
    CommonModule,
    HotelRoutingModule,
    TabViewModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    
  ]
})
export class HotelModule { }
