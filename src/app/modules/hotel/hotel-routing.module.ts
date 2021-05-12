import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelFromComponent } from './components/hotel-from/hotel-from.component';
import { HotelListComponent } from './components/hotel-list/hotel-list.component';

const routes: Routes = [
  { path: '', component: HotelListComponent },
  { path: ':id', component: HotelFromComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelRoutingModule { }
