import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IHotel } from 'src/app/interfaces/hotel.interface';
import { IState } from 'src/app/interfaces/state.inteface';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'ss-list-hotel',
  templateUrl: './list-hotel.component.html',
  styleUrls: ['./list-hotel.component.scss']
})

export class ListHotelComponent implements OnInit {
  cols: any[];
  hotels: IHotel[] = [];
  loading: boolean;
  currentPage: number;
  selectedHotel: IHotel;
  items: IState[];
  item: any;
  title: string;
  showStateDialog: boolean;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (max - 5 <= Math.round(pos) && Math.round(pos) <= max + 5) {
      this.currentPage++;
      this.getHotels(false);
    }
  }

  constructor(
    private confirmationService: ConfirmationService,
    private srvHotel: HotelService,
    private srvMsg: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.items = [
      { code: 0, name: 'فعال' },
      { code: 1, name: 'غیر فعال' },
      { code: 2, name: 'در انتظار' },
    ];
    this.cols = [
      { field: 'title', header: 'عنوان هتل' },
      { field: 'fullname', header: 'ایجاد کننده' },
      { field: 'state', header: 'وضعیت' },
      { field: 'createdDate', header: 'تاریخ ایجاد' }
    ];
    this.getHotels(true);
  }

  changeState(stateId: number): void {
    this.showStateDialog = false;
    this.srvHotel.changeState({
      id: this.selectedHotel.id,
      state: stateId
    }).subscribe(res => {
      this.srvMsg.add({ severity: 'success', summary: 'تغییر وضعیت', detail: 'عملیات با موفقیت انجام شد' });
      this.selectedHotel.state = { id: stateId, title: this.items.find(i => i.code === stateId).name };
    });
  }

  g
  
  
  getHotels(firstLoad: boolean): void {
    if (firstLoad) {
      this.currentPage = 1;
      this.hotels = [];
    }
    this.loading = true;
    let filter = ``;
    if (this.item) {
      filter += `&state=${this.item.code}`;
    }
    if (this.title) {
      filter += `&title=${this.title}`;
    }
    this.srvHotel.getHotels(filter, this.currentPage).subscribe(res => {
      this.hotels.push(...res);
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
        this.deleteHotel(id);
      }
    });
  }

  deleteHotel(id: number): void {
    this.srvHotel.deleteHotel(id).subscribe(() => {
      this.getHotels(true);
    });
  }

  editHotel(id: number): void {
    this.router.navigate([`../panel/hotel/hotel-form/${id}`]);
  }

}
