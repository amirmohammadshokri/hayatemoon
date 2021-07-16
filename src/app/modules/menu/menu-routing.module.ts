import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPlacesComponent } from '../places/components/form-places/form-places.component';
import { FormMenuComponent } from './components/form-menu/form-menu.component';
import { ListMenuComponent } from './components/list-menu/list-menu.component';

const routes: Routes = [
  { path: 'list', component: ListMenuComponent },
  { path: 'form/:id', component: FormMenuComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
