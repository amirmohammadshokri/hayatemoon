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

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (max - 5 <= Math.round(pos) && Math.round(pos) <= max + 5) {
      this.currentPage++;
      this.getCalendar();
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
    this.getCalendar();
  }

  getCalendar(): void {
    this.loading = true;
    this.serCalendar.getCalendar(1).subscribe(res => {
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
      this.getCalendar();
    });
  }

  editCalendar(id: number): void {
    console.log(id);
    this.router.navigate([`../panel/residence/calendar-form/${id}`]);
  }

}
