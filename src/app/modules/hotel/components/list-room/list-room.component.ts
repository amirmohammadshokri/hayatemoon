import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { HotelService } from 'src/app/services';

@Component({
  selector: 'ss-list-room',
  templateUrl: './list-room.component.html',
  styleUrls: ['./list-room.component.scss']
})
export class ListRoomComponent implements OnInit {

  cols: any[];
  loading: boolean;
  currentPage: number;
  rooms: any[] = [];
  nothingElse: boolean;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (max === Math.round(pos) && !this.nothingElse) {
      this.currentPage++;
      this.getRooms(false);
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
      { field: 'description', header: 'توضیحات' }
    ];
    this.currentPage = 1;
    this.getRooms(true);
  }

  getRooms(firstLoad: boolean): void {
    if (firstLoad) {
      this.currentPage = 1;
      this.rooms = [];
    }
    this.loading = true;
    this.srvHotel.getRooms(this.currentPage).subscribe(res => {
      if (res.length === 0) {
        this.nothingElse = true;
      }
      this.rooms.push(...res);
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
        this.deleteRoom(id);
      }
    });
  }

  deleteRoom(id: number): void {
    this.srvHotel.deleteRoom(id).subscribe(() => {
      this.getRooms(true);
    });
  }

  editRoom(id: number): void {
    this.router.navigate([`../panel/hotel/room-form/${id}`]);
  }

}
