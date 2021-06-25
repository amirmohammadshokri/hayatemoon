import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormTicketComponent } from './components/form-ticket/form-ticket.component';
import { ListTicketsComponent } from './components/list-tickets/list-tickets.component';

const routes: Routes = [
  { path: 'tickets', component: ListTicketsComponent },
  { path: 'form-ticket/:id', component: FormTicketComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketingRoutingModule { }
