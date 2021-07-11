import { Component, HostListener, OnInit } from '@angular/core';
import { DataService, ReportService } from 'src/app/services';
import * as moment from 'jalali-moment';


@Component({
  selector: 'ss-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss']
})
export class ToursComponent implements OnInit {
  nothingElse: boolean;
  currentPage: number;
  from: any;
  to: any;
  tours: any[];
  cols: any[];
  types: any[];
  type: any;
  loading: boolean;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (max === Math.round(pos) && !this.nothingElse) {
      this.currentPage++;
      this.getToures(false);
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
      { field: 'company', header: 'شرکت' },
      { field: 'startDate', header: 'تاریخ آغاز' },
      { field: 'endDate', header: 'تاریخ پایان' },
      { field: 'price', header: 'قیمت' },
      { field: 'location', header: 'محل' },
      { field: 'state', header: 'وضعیت' },
    ];
  }

  ngOnInit(): void {
    this.getToures(true);
  }

  getToures(firstLoad: boolean) {
    this.loading = true;
    if (firstLoad) {
      this.currentPage = 1;
      this.tours = [];
    }
    this.srvData.showMainProgressBarForMe();
    const from: Date = this.from?._d;
    const utcFrom = new Date(from.toUTCString());
    const to: Date = this.to?._d;
    const utcTo = new Date(to.toUTCString());
    this.srvRprt.tour(utcFrom.toISOString(), utcTo.toISOString(), 0, this.currentPage, 15).subscribe(res => {
      if (res.length === 0) {
        this.nothingElse = true;
      }
      this.tours.push(...res.map(r => ({
        company: r.company.title,
        startDate: r.startDate,
        endDate: r.endDate,
        price: r.price,
        location: r.location.title,
        title: r.title,
        state: r.state.title
      })));
      this.loading = false;
      this.srvData.thanksMainProgressBar();
    })
  }

}
