import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { IAddTicket } from 'src/app/interfaces';
import { CompanyService, TicketingService } from 'src/app/services';

@Component({
  selector: 'ss-form-ticket',
  templateUrl: './form-ticket.component.html',
  styleUrls: ['./form-ticket.component.scss']
})
export class FormTicketComponent implements OnInit {

  saving: boolean;
  submitted: boolean;
  ticket: IAddTicket = { priority: 2 };
  priorities: SelectItem[] = [
    { label: 'کم', value: 2 },
    { label: 'متوسط', value: 1 },
    { label: 'زیاد', value: 0 }
  ];
  users: any[];

  constructor(
    private srvCompany: CompanyService,
    private srvTicket: TicketingService,
    private router: Router,
    private srvMsg: MessageService) { }

  ngOnInit(): void {
    this.srvCompany.getUsers(3, 1, 1000).subscribe(res => {
      this.users = res;
    });
  }

  submit(): void {
    if (this.ticket.title && this.ticket.text) {
      this.saving = true;
      this.srvTicket.addTicket(this.ticket).subscribe(() => {
        this.srvMsg.add({ severity: 'success', summary: 'ثبت تیکت', detail: 'درخواست با موفقیت ثبت شد' });
        this.saving = false;
        this.router.navigate(['../panel/ticket/tickets']);
      }, () => {
        this.saving = false;
      });
    }
    this.submitted = true;
  }

}
