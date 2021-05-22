import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { IRoomkind } from 'src/app/interfaces/roomkind.interface';
import { HotelService } from 'src/app/services';

@Component({
  selector: 'ss-list-roomkind',
  templateUrl: './list-roomkind.component.html',
  styleUrls: ['./list-roomkind.component.scss']
})
export class ListRoomkindComponent implements OnInit {


  cols: any[];
  loading: boolean;
  deleting:boolean;
  currentPage: number;
  roomkind: IRoomkind[] = [];

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (max - 5 <= Math.round(pos) && Math.round(pos) <= max + 5) {
      this.currentPage++;
      this.getRomkind(false);
    }
  }
  constructor(
    private srvHotel: HotelService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'title', header: 'عنوان اتاق' },
      { field: 'fontIconId', header: 'آیکن' },
      { field: 'createdDate', header: 'تاریخ ایجاد' }
    ];
    this.currentPage = 1;
    this.getRomkind(true);
  }

  getRomkind(firstLoad: boolean): void {
    if (firstLoad) {
      this.currentPage = 1;
      this.roomkind = [];
    }
    this.loading = true;
    this.srvHotel.getRoomkind(this.currentPage).subscribe(res => {
      this.roomkind.push(...res);
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
        this.deleteRoomkind(id);
      }
    });
  }

  deleteRoomkind(id: number): void {
    this.deleting=true;
    this.srvHotel.deleteRoomkind(id).subscribe(() => {
      this.deleting=false;
      this.getRomkind(true);
    });
  }

  editRomkind(id: number): void {
    console.log(id);
    this.router.navigate([`../panel/hotel/room-kind-form/${id}`]);
  }

}
