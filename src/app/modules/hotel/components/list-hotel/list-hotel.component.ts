import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
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
  selectedHotelId:number;
  items: IState[];
  item: any;
  title: string;

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
    private sHotel: HotelService,
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
  
  confirmChangestate(id: number): void {
    this.confirmationService.confirm({
    key:"stateDialog"
    });
  }

  changeState(stateId:number):void{
    this.selectedHotelId=stateId; 

  }
  
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
      this.getHotels(true);
    });
  }

  editHotel(id: number): void {
    this.router.navigate([`./hotel-form/${id}`]);
  }

}
