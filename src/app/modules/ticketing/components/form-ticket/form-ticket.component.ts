import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { IAddTicket } from 'src/app/interfaces';

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

  constructor() { }

  ngOnInit(): void {
  }

  submit(): void {

  }

}
