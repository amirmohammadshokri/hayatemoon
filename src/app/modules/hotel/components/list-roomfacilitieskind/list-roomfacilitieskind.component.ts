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
  currentPage: number;
  roomfacilitieskind: IRoomfacilitieskind[] = [];

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (max - 5 <= Math.round(pos) && Math.round(pos) <= max + 5) {
      this.currentPage++;
      this.getRoomfacilitieskind();
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
    this.getRoomfacilitieskind();
  }

  getRoomfacilitieskind(): void {
    this.loading = true;
    this.srvHotel.getRoomkind().subscribe(res => {
      this.roomfacilitieskind.push(...res);
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
    this.srvHotel.deleteRoomfacilitieskind(id).subscribe(() => {
      this.getRoomfacilitieskind();
    });
  }

  editRoomfacilitieskind(id: number): void {
    this.router.navigate([`./panel/hotel/form-facilitieskind/${id}`]);
  }

}
