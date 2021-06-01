import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IAddRoom } from 'src/app/interfaces';
import { DataService, HotelService, SearchService } from 'src/app/services';

@Component({
  selector: 'ss-form-room',
  templateUrl: './form-room.component.html',
  styleUrls: ['./form-room.component.scss']
})
export class FormRoomComponent implements OnInit {

  rooms: IAddRoom[] = [{}];
  hotels: any[] = [];
  selectedHotel: any;
  roomkinds: any[] = [];
  selectedRoom: any;
  facilities: any[] = [];
  facilitiesKinds: any[] = [];
  saving: boolean;
 
    constructor(
      private srvData: DataService,
      private srvSrch: SearchService,
      private srvHotel: HotelService,
      private srvMsg: MessageService,
      private router: Router,
      private aRoute: ActivatedRoute,
      private confirmationService: ConfirmationService,
    ) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.saving = true;
   
      this.srvHotel.addRoom(this.rooms).subscribe(res => {
        this.saving = false;
        this.srvMsg.add({ severity: 'success', summary: 'ثبت  اطلاعات', detail: 'ثبت اطلاعات با موفقیت انجام شد .' });
        this.router.navigate(['./panel/hotel/rooms']);
      }, _ => {
        this.saving = false;
      });
    

  }
  getHotels(event: any): void {
    this.srvData.showMainProgressBarForMe();
    this.srvSrch.getHotel(event.query).subscribe(res => {
      this.hotels = res;
      this.srvData.thanksMainProgressBar();
    });
  }
  getRoomkinds(event: any): void {
    this.srvData.showMainProgressBarForMe();
    this.srvSrch.getHotelRoom(event.query).subscribe(res => {
      this.roomkinds = res;
      this.srvData.thanksMainProgressBar();
    });
  }
  getFacilities(event: any): void {
    this.srvSrch.getHotelRoomFacilitiesKind(event.query).subscribe(res => {
      this.facilities = res;
    });
  }
  addRoom(): void {
    this.rooms.push({});
  }

}
