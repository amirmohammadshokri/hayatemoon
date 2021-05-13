import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormHotelfacilitieskindComponent } from './components/form-hotelfacilitieskind/form-hotelfacilitieskind.component';
import { FormRoomfacilitieskindComponent } from './components/form-roomfacilitieskind/form-roomfacilitieskind.component';
import { FormRoomkindComponent } from './components/form-roomkind/form-roomkind.component';
import { FromHotelComponent } from './components/from-hotel/from-hotel.component';
import { ListHotelComponent } from './components/list-hotel/list-hotel.component';
import { ListHotelfacilitieskindComponent } from './components/list-hotelfacilitieskind/list-hotelfacilitieskind.component';
import { ListRoomfacilitieskindComponent } from './components/list-roomfacilitieskind/list-roomfacilitieskind.component';
import { ListRoomkindComponent } from './components/list-roomkind/list-roomkind.component';

const routes: Routes = [
  { path: 'hotels', component: ListHotelComponent },
  { path: 'hotel-facilitieskinds', component: ListHotelfacilitieskindComponent },
  { path: 'room-kinds', component: ListRoomkindComponent },
  { path: 'room-facilitieskinds', component: ListRoomfacilitieskindComponent },

  { path: 'hotel-form/:id', component: FromHotelComponent },
  { path: 'hotel-facilitieskind-form/:id', component: FormHotelfacilitieskindComponent },
  { path: 'room-kind-form/:id', component: FormRoomkindComponent },
  { path: 'room-facilitieskind-form/:id', component: FormRoomfacilitieskindComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelRoutingModule { }
