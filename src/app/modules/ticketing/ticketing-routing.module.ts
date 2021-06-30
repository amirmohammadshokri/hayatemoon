import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversationsComponent } from './components/conversations/conversations.component';
import { FormTicketComponent } from './components/form-ticket/form-ticket.component';
import { ListTicketsComponent } from './components/list-tickets/list-tickets.component';

const routes: Routes = [
  { path: 'tickets', component: ListTicketsComponent },
  { path: 'form-ticket/:id', component: FormTicketComponent },
  { path: 'conversations/:ticketId', component: ConversationsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketingRoutingModule { }
