import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormAdvertisingComponent } from './components/form-advertising/form-advertising.component';
import { ListAdvertisingComponent } from './components/list-advertising/list-advertising.component';

const routes: Routes = [
  { path: 'advertisings', component: ListAdvertisingComponent },
  { path: 'form-advertising/:id', component: FormAdvertisingComponent },  
 
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvertisingRoutingModule { }
