import { Component, HostListener, OnInit } from '@angular/core';
import { DataService, ReportService } from 'src/app/services';
import * as moment from 'jalali-moment';

@Component({
  selector: 'ss-registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.scss']
})
export class RegistersComponent implements OnInit {

  nothingElse: boolean;
  currentPage: number;
  from: any;
  to: any;
  data: any[];
  cols: any[];
  loading: boolean;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (max === Math.round(pos) && !this.nothingElse) {
      this.currentPage++;
      this.getRegisters(false);
    }
  }

  constructor(private srvRprt: ReportService, private srvData: DataService) {
    var date = new Date();
    let today = date.toLocaleDateString('fa-IR').replace(/([۰-۹])/g, token => String.fromCharCode(token.charCodeAt(0) - 1728));
    this.to = moment(today, 'jYYYY/jMM/jDD');
    date.setMonth(date.getMonth() - 1);
    today = date.toLocaleDateString('fa-IR').replace(/([۰-۹])/g, token => String.fromCharCode(token.charCodeAt(0) - 1728));
    this.from = moment(today, 'jYYYY/jMM/jDD');
    this.cols = [
      { field: 'title', header: 'عنوان' },
      { field: 'type', header: 'نوع' },
      { field: 'employeeName', header: 'مدیرعامل' },
      { field: 'internalPhone', header: 'تلفن داخلی' },
      { field: 'registerDate', header: 'تاریخ ثبت نام' },
      { field: 'location', header: 'محل' },
      { field: 'state', header: 'وضعیت' },
    ];
  }

  ngOnInit(): void {
    this.getRegisters(true);
  }

  getRegisters(firstLoad: boolean) {
    this.loading = true;
    if (firstLoad) {
      this.currentPage = 1;
      this.data = [];
    }
    this.srvData.showMainProgressBarForMe();
    const from: Date = this.from?._d;
    const utcFrom = new Date(from.toUTCString());
    const to: Date = this.to?._d;
    const utcTo = new Date(to.toUTCString());
    this.srvRprt.companyUser(utcFrom.toISOString(), utcTo.toISOString(), this.currentPage, 15).subscribe(res => {
      if (res.length === 0) {
        this.nothingElse = true;
      }
      this.data.push(...res.map(r => ({
        type: r.companyType.title,
        employeeName: r.employeeName,
        internalPhone: r.internalPhone,
        registerDate: r.registerDate,
        location: r.location,
        title: r.title,
        state: r.state.title
      })));
      this.loading = false;
      this.srvData.thanksMainProgressBar();
    })
  }
}
