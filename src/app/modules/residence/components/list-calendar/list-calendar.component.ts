import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ICalendar } from 'src/app/interfaces/calendar.interface';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'ss-list-calendar',
  templateUrl: './list-calendar.component.html',
  styleUrls: ['./list-calendar.component.scss']
})
export class ListCalendarComponent implements OnInit {
  cols: any[];
  loading: boolean;
  currentPage: number;
  calendar: ICalendar[] = [];
  nothingElse: boolean;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (max === Math.round(pos) && !this.nothingElse) {
      this.currentPage++;
      this.getCalendar(false);
    }
  }
  constructor(
    private serCalendar: CalendarService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'title', header: 'تاریخ' },
    ];
    this.getCalendar(true);
  }

  getCalendar(firstLoad: boolean): void {
    if (firstLoad) {
      this.calendar = [];
      this.currentPage = 1;
    }
    this.loading = true;
    this.serCalendar.getCalendar(this.currentPage).subscribe(res => {
      if (res.length === 0) {
        this.nothingElse = true;
      }
      this.calendar.push(...res);
      this.loading = false;
    });
  }

  confirmDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف این ردیف اطمینان دارید؟',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'بله',
      rejectLabel: 'نه',
      accept: () => {
        this.deleteCalendar(id);
      }
    });
  }

  deleteCalendar(id: number): void {
    this.serCalendar.deleteCalendar(id).subscribe(() => {
      this.getCalendar(true);
    });
  }

  editCalendar(id: number): void {
    this.router.navigate([`../panel/residence/calendar-form/${id}`]);
  }

}
