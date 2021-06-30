import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TicketingService } from 'src/app/services';

@Component({
  selector: 'ss-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit {

  closing: boolean = false;
  conversasions: any[] = [];
  ticketId: number;

  constructor(private srvTicket: TicketingService, private route: ActivatedRoute, private srvMsg: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(prms => {
      if (prms.ticketId > 0) {
        this.ticketId = Number.parseInt(prms.ticketId, 0);
        this.getConversations();
      }
    });
  }

  getConversations(): void {
    this.srvTicket.conversations(this.ticketId).subscribe(prms => {
      this.conversasions = prms;
    })
  }

  submit(): void {
    this.closing = true;
    this.srvTicket.closeTicket(this.ticketId).subscribe(() => {
      this.closing = false;
      this.srvMsg.add({ severity: 'success', summary: 'ثبت اطلاعات', detail: 'ثبت اطلاعات با موفقیت انجام شد .' });
      this.router.navigate(['../panel/ticket/tickets']);
    })
  }

}
