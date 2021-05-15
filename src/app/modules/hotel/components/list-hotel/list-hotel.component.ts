import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
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
  items: IState[];
  item: any;
  title: string;
  latest: boolean = false;
  sss: string;

  // hotelTypes: SelectItem[] = [];

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (max - 5 <= Math.round(pos) && Math.round(pos) <= max + 5) {
      this.currentPage++;
      this.isUserAuthenticated();
    }
  }

  constructor(
    private confirmationService: ConfirmationService,
    private sHotel: HotelService,
    private sMsg: MessageService,
    private router: Router
  ) {
    this.items = [
      {
        code: 0,
        name: "فعال"
      },
      {
        code: 1,
        name: "غیر فعال"
      },
      {
        code: 2,
        name: "در انتظار"
      },

    ];
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'title', header: 'عنوان هتل' },
      { field: 'fullname', header: 'ایجاد کننده' },
      { field: 'state', header: 'وضعیت' },
      { field: 'createdDate', header: 'تاریخ ایجاد' }
    ];
    this.getHotels();

  }
  isUserAuthenticated = (): string => {
    this.sss = localStorage.getItem("token");
    return this.sss;
  }

  getHotels(): void {
    this.loading = true;
    let filter = `?`;
    if (this.item) {
      filter += `&state=${this.item.code}`;
    }
    if (this.title) {
      filter += `&title=${this.title}`;
    }
    this.hotels = [];
    this.sHotel.getHotels(filter, this.currentPage).subscribe(res => {
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
    this.sHotel.deleteHotel(id).subscribe(() => {
      this.currentPage = 1;
      this.getHotels();
    });
  }
  editHotel(id: number): void {
    this.router.navigate([`./hotel-form/${id}`]);
  }

}
