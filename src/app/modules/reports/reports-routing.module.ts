import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanceComponent } from './components/finance/finance.component';
import { RegistersComponent } from './components/registers/registers.component';
import { ToursComponent } from './components/tours/tours.component';

const routes: Routes = [
  { path: 'tours', component: ToursComponent },
  { path: 'registers', component: RegistersComponent },
  { path: 'finance', component: FinanceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
