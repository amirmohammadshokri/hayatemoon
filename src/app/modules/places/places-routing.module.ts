import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPlacesComponent } from './components/form-places/form-places.component';
import { ListPlacesComponent } from './components/list-places/list-places.component';

const routes: Routes = [
  { path: 'places', component: ListPlacesComponent },
  { path: 'places-form/:id', component: FormPlacesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlacesRoutingModule { }
