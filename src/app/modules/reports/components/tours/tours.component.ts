import { Component, HostListener, OnInit } from '@angular/core';
import { DataService, PromotionService, ReportService, TourService } from 'src/app/services';
import * as moment from 'jalali-moment';
import { SelectItem } from 'primeng/api';


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
  types: SelectItem[] = [];
  type: any;
  loading: boolean;
  selectedPromotion: any;
  promotions: any[] = [];
 

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (max === Math.round(pos) && !this.nothingElse) {
      this.currentPage++;
      this.getToures(false);
    }
  }

  constructor(private srvRprt: ReportService, private srvData: DataService, private srvTour: TourService,private srvPromotion:PromotionService) {
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
      { field: 'state', header: 'وضعیت' },
    ];

    this.srvTour.getTourType().subscribe(type => {
      this.types = type.map(t => ({ value: t.id, label: t.title }));
      this.type = this.types[0].value;
      this.getToures(true);
    })
  }

  ngOnInit(): void {

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
    this.srvRprt.tour(utcFrom.toISOString(), utcTo.toISOString(), this.type, this.currentPage, 15).subscribe(res => {
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
