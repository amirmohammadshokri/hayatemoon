import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IAddCalendar } from 'src/app/interfaces/add-calendar.interface';
import { CalendarService } from 'src/app/services/calendar.service';
import * as moment from 'jalali-moment';

@Component({
  selector: 'ss-form-calendar',
  templateUrl: './form-calendar.component.html',
  styleUrls: ['./form-calendar.component.scss']
})
export class FormCalendarComponent implements OnInit {

  calendar: IAddCalendar[] = [];
  CalendarId: number;
  holiday: any;
  saving: boolean;

  constructor(
    private serCalendar: CalendarService,
    private sMsg: MessageService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(prms => {
      if (prms.id > 0) {
        this.CalendarId = Number.parseInt(prms.id, 0);
        this.getCalendarById(this.CalendarId);
      }
    });
  }

  getCalendarById(id: number): void {
    this.serCalendar.getCalendarById(id).subscribe(cal => {
      this.holiday = moment(cal.persianDate, 'jYYYY/jMM/jDD');
    });
  }

  submit(): void {
    this.saving = true;
    const fromDate: Date = this.holiday._d;
    const utcFromDate = new Date(fromDate.toUTCString());
    if (this.CalendarId > 0) {
      const obj: IAddCalendar = {
        id: this.CalendarId,
        holiday: utcFromDate.toISOString()
      };
      this.serCalendar.addCalendar(obj).subscribe(() => {
        this.sMsg.add({ severity: 'success', summary: 'ویرایش  تاریخ', detail: 'ویرایش با موفقیت انجام شد' });
        this.saving = false;
        this.router.navigate(['../panel/residence/calendar']);
      }, _ => {
        this.saving = false;
        this.router.navigate(['../panel/residence/calendar']);
      });
    }
    else {
      const obj: IAddCalendar = {
        holiday: utcFromDate.toISOString()
      };
      this.serCalendar.addCalendar(obj).subscribe(() => {
        this.sMsg.add({ severity: 'success', summary: 'ثبت تاریخ ', detail: 'عملیات با موفقیت انجام شد' });
        this.holiday = null;
        this.saving = false;
        this.router.navigate(['../panel/residence/calendar']);

      }, _ => {
        this.saving = false;
        this.router.navigate(['../panel/residence/calendar']);
      });
    }
  }

}
