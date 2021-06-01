import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { IHotelfacilitieskind } from 'src/app/interfaces/hotelfacilitieskind.interface';
import { HotelService } from 'src/app/services';

@Component({
  selector: 'ss-list-hotelfacilitieskind',
  templateUrl: './list-hotelfacilitieskind.component.html',
  styleUrls: ['./list-hotelfacilitieskind.component.scss']
})
export class ListHotelfacilitieskindComponent implements OnInit {

  cols: any[];
  loading: boolean;
  deleting: boolean;
  currentPage: number;
  hotelfacilitieskind: IHotelfacilitieskind[] = [];
  nothingElse: boolean;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (max === Math.round(pos) && !this.nothingElse) {
      this.currentPage++;
      this.getHotelfacilitieskind(false);
    }
  }

  constructor(
    private srvHotel: HotelService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'title', header: 'عنوان' },
      { field: 'fontIconId', header: 'آیکن' },
      { field: 'createdDate', header: 'تاریخ ایجاد' }
    ];
    this.currentPage = 1;
    this.getHotelfacilitieskind(true);
  }

  getHotelfacilitieskind(firstLoad: boolean): void {
    if (firstLoad) {
      this.currentPage = 1;
      this.hotelfacilitieskind = [];
    }
    this.loading = true;
    this.srvHotel.getHotelfacilitieskind(this.currentPage).subscribe(res => {
      if (res.length === 0) {
        this.nothingElse = true;
      }
      this.hotelfacilitieskind.push(...res);
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
        this.deleteHotelfacilitieskind(id);
      }
    });
  }

  deleteHotelfacilitieskind(id: number): void {
    this.deleting = true;
    this.srvHotel.deleteHotelfacilitieskind(id).subscribe(() => {
      this.deleting = false;
      this.getHotelfacilitieskind(true);
    });
  }

  editHotelfacilitieskind(id: number): void {
    this.router.navigate([`../panel/hotel/hotel-facilitieskind-form/${id}`]);
  }

}
