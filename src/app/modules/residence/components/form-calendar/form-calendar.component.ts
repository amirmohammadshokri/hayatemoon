import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IAddCalendar } from 'src/app/interfaces/add-calendar.interface';
import { CalendarService } from 'src/app/services/calendar.service';
import { CommonServiece } from 'src/app/services/common.service';

@Component({
  selector: 'ss-form-calendar',
  templateUrl: './form-calendar.component.html',
  styleUrls: ['./form-calendar.component.scss']
})
export class FormCalendarComponent implements OnInit {

  calendar: IAddCalendar[] = [];
  CalendarId: number;
  holiday:any;
  
  constructor(
    private serCalendar: CalendarService,
    private sMsg: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private sComm: CommonServiece

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(prms => {
      if (prms.calendarId > 0) {
        this.CalendarId = Number.parseInt(prms.calendarId, 0);
        this.getCalendarById(this.CalendarId);
      }
    });
  }
  getCalendarById(id: number): void {
    this.serCalendar.getCalendarById(id).subscribe(cou => {
      this.calendar = cou;
    });
  }

  submit(): void {
    if (this.CalendarId > 0) {
      const obj: IAddCalendar = {
     
      };
      this.serCalendar.addCalendar(obj).subscribe(() => {
        this.sMsg.add({ severity: 'success', summary: 'ویرایش تاریخ', detail: 'عملیات با موفقیت انجام شد' });
        this.router.navigate(['./panel/residence/list-calendar']);
      });
    }
    else {
      const obj1: IAddCalendar = {
        id:0,
        holiday:this.holiday
      };
      this.serCalendar.addCalendar(obj1).subscribe(() => {
        this.sMsg.add({ severity: 'success', summary: 'ثبت تاریخ ', detail: 'عملیات با موفقیت انجام شد' });
        this.router.navigate(['./panel/residence/list-calendar']);
      });
    }
  }

}
