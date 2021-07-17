import { Component, HostListener, OnInit } from '@angular/core';
import * as moment from 'jalali-moment';
import { SelectItem } from 'primeng/api';
import { DataService, PromotionService, ReportService } from 'src/app/services';

@Component({
  selector: 'ss-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponent implements OnInit {
  nothingElse: boolean;
  currentPage: number;
  from: any;
  to: any;
  data: any[];
  cols: any[];
  promotions: SelectItem[] = [];
  promotionId: any;
  loading: boolean;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (max === Math.round(pos) && !this.nothingElse) {
      this.currentPage++;
      this.getData(false);
    }
  }

  constructor(private srvRprt: ReportService, private srvData: DataService, private srvPro: PromotionService) {
    var date = new Date();
    let today = date.toLocaleDateString('fa-IR').replace(/([۰-۹])/g, token => String.fromCharCode(token.charCodeAt(0) - 1728));
    this.to = moment(today, 'jYYYY/jMM/jDD');
    date.setMonth(date.getMonth() - 6);
    today = date.toLocaleDateString('fa-IR').replace(/([۰-۹])/g, token => String.fromCharCode(token.charCodeAt(0) - 1728));
    this.from = moment(today, 'jYYYY/jMM/jDD');
    this.cols = [
      { field: 'title', header: 'عنوان' },
      { field: 'company', header: 'شرکت' },
      { field: 'startDate', header: 'تاریخ آغاز' },
      { field: 'endDate', header: 'تاریخ پایان' },
      { field: 'price', header: 'قیمت' },
      { field: 'location', header: 'محل' },
      { field: 'companyType', header: 'نوع شرکت' },
    ];

    this.srvPro.promotions(null, null).subscribe(type => {
      this.promotions = type.map(t => ({ value: t.id, label: t.title }));
      this.promotionId = this.promotions[0].value;
      this.getData(true);
    })
  }

  ngOnInit(): void {

  }

  getData(firstLoad: boolean) {
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
    this.srvRprt.finance(utcFrom.toISOString(), utcTo.toISOString(), 0, this.currentPage, 15).subscribe(res => {
      if (res.length === 0) {
        this.nothingElse = true;
      }
      this.data.push(...res.map(r => ({
        company: r.company.title,
        startDate: r.startDate,
        endDate: r.endDate,
        price: r.price,
        location: r.location.title,
        title: r.title,
        companyType: r.companyType.title
      })));
      this.loading = false;
      this.srvData.thanksMainProgressBar();
    })
  }

}