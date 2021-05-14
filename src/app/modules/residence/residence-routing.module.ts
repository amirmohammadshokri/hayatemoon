import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormResidenceComponent } from './components/form-residence/form-residence.component';
import { FormResidencefacilitieskindComponent } from './components/form-residencefacilitieskind/form-residencefacilitieskind.component';
import { ListResidenceComponent } from './components/list-residence/list-residence.component';
import { ListResidencefacilitieskindComponent } from './components/list-residencefacilitieskind/list-residencefacilitieskind.component';


const routes: Routes = [
  { path: 'residence-facilitieskinds', component: ListResidencefacilitieskindComponent },
  { path: 'residence-facilitieskind-form/:id', component: FormResidencefacilitieskindComponent },
  { path: 'residence', component: ListResidenceComponent },
  { path: 'residence-form/:id', component: FormResidenceComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
 
export class ResidenceRoutingModule { }
