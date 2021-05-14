import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormTourComponent } from './components/form-tour/form-tour.component';
import { ListTourComponent } from './components/list-tour/list-tour.component';

const routes: Routes = [
  { path: 'tour', component: ListTourComponent },
  { path: 'tour-form/:id', component: FormTourComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TourRoutingModule { }
