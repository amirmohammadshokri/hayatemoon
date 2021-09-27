import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormVehicelsComponent } from './form-vehicels/form-vehicels.component';
import { ListVehicelsComponent } from './list-vehicels/list-vehicels.component';

const routes: Routes = [
  { path: 'vehicels', component: ListVehicelsComponent },
  { path: 'form-vehicels/:id', component: FormVehicelsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicelsRoutingModule { }
