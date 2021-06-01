import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { IRoomfacilitieskind } from 'src/app/interfaces/roomfacilitieskind.interface';
import { HotelService } from 'src/app/services';

@Component({
  selector: 'ss-list-roomfacilitieskind',
  templateUrl: './list-roomfacilitieskind.component.html',
  styleUrls: ['./list-roomfacilitieskind.component.scss']
})
export class ListRoomfacilitieskindComponent implements OnInit {
  cols: any[];
  loading: boolean;
  deleting: boolean;
  currentPage: number;
  roomfacilitieskind: IRoomfacilitieskind[] = [];
  nothingElse: boolean;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (max === Math.round(pos) && !this.nothingElse) {
      this.currentPage++;
      this.getRoomfacilitieskind(false);
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
    this.getRoomfacilitieskind(true);
  }

  getRoomfacilitieskind(firstLoad: boolean): void {
    if (firstLoad) {
      this.currentPage = 1;
      this.roomfacilitieskind = [];
    }
    this.loading = true;
    this.srvHotel.getRoomfacilitieskind(this.currentPage).subscribe(res => {
      this.roomfacilitieskind.push(...res);
      if (res.length === 0) {
        this.nothingElse = true;
      }
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
        this.deleteRoomfacilitieskind(id);
      }
    });
  }

  deleteRoomfacilitieskind(id: number): void {
    this.deleting = true;
    this.srvHotel.deleteRoomfacilitieskind(id).subscribe(() => {
      this.deleting = true;
      this.getRoomfacilitieskind(true);
    });
  }

  editRoomfacilitieskind(id: number): void {
    this.router.navigate([`../panel/hotel/room-facilitieskind-form/${id}`]);
  }

}
