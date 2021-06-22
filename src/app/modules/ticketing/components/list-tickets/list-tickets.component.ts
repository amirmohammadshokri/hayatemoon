import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITicketFilter } from 'src/app/interfaces';
import { TicketingService } from 'src/app/services/ticketing.service';

@Component({
  selector: 'ss-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrls: ['./list-tickets.component.scss']
})
export class ListTicketsComponent implements OnInit {
  nothingElse: boolean;
  cols: any[];
  loading: boolean;
  currentPage: number;
  tickets: any[] = [];
  filter: ITicketFilter = {
    attachmentMediaId: 0,
    priority: 0,
    receiverUserId: 0,
    text: '',
    title: ''
  };

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (max === Math.round(pos) && !this.nothingElse) {
      this.currentPage++;
      this.getTickets(false);
    }
  }
  constructor(
    private srvTicket: TicketingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'title', header: 'عنوان' }
    ];
    this.currentPage = 1;
    this.getTickets(true);
  }

  getTickets(firstLoad: boolean): void {
    this.loading = true;
    if (firstLoad) {
      this.currentPage = 1;
      this.tickets = [];
    }
    this.srvTicket.getTicketings(this.filter).subscribe(res => {
      if (res.length === 0) {
        this.nothingElse = true;
      }
      this.tickets.push(...res);
      this.loading = false;
    });
  }

}
