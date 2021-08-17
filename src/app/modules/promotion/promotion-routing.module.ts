import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListPromotionComponent } from './components/list-promotion/list-promotion.component';
import { FormPromotionComponent } from './components/form-promotion/form-promotion.component';
import { FormPromotionTourComponent } from './components/form-promotion-tour/form-promotion-tour.component';


const routes: Routes = [
  { path: 'promotions', component: ListPromotionComponent },
  { path: 'form-promotion/:id', component: FormPromotionComponent },  
  { path: 'promotion-tour', component: FormPromotionTourComponent },
  { path: 'report-promotion/:id', component: FormPromotionComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionRoutingModule { }
