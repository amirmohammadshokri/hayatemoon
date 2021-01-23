import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { ManageAdverComponent } from './components/manage-adver/manage-adver.component';
 


export const routes: Routes = [
  { path: '', component: ManageAdverComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class PostingRoutingModule { }
