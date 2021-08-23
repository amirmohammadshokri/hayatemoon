import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IAdvertising } from 'src/app/interfaces/advertising.interface';
import { DataService } from 'src/app/services';
import { AdvertisingService } from 'src/app/services/advertising.service';

@Component({
  selector: 'ss-list-advertising',
  templateUrl: './list-advertising.component.html',
  styleUrls: ['./list-advertising.component.scss']
})
export class ListAdvertisingComponent implements OnInit {

  cols: any[];
  Advertisings: IAdvertising[] = [];
  loading: boolean;
  currentPage: number;
  showStateDialog: boolean;
  nothingElse: boolean;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (max === Math.round(pos) && !this.nothingElse) {
      this.currentPage++;
      this.getAdvertising(false);
    }
  }

  constructor(
    private confirmationService: ConfirmationService,
    private srvAds: AdvertisingService,
    private srvMsg: MessageService,
    private router: Router,
    private srvData: DataService
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'startDate', header: 'تاریخ شروع' },
      { field: 'endDate', header: 'تاریخ پایان' },
      { field: 'fullname', header: 'کاربر ایجاد کننده' }
    ];
    this.getAdvertising(true);
  }

  getAdvertising(firstLoad: boolean): void {
    if (firstLoad) {
      this.currentPage = 1;
      this.Advertisings = [];
    }
    this.loading = true;

    this.srvAds.getAdvertising(this.currentPage, 15).subscribe(res => {
      if (res.length === 0) {
        this.nothingElse = true;
      }
      this.Advertisings.push(...res.map(r => ({
        id: r.id,
        startDate: r.startDate,
        endDate: r.endDate,
        fullname: r.regCompanyUser.regUser.fullName
      })));
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
        this.deleteAdvertising(id);
      }
    });
  }

  deleteAdvertising(id: number): void {
    this.srvAds.deleteAdvertising(id).subscribe(() => {
      this.currentPage = 1;
      this.getAdvertising(true);
    });
  }

  editAdvertising(id: number): void {
    this.router.navigate([`../panel/advertising/form-advertising/${id}`]);
  }

}
