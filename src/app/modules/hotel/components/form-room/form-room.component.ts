import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { IAddRoom } from 'src/app/interfaces';
import { DataService, HotelService, SearchService } from 'src/app/services';
import * as _ from 'lodash';

@Component({
  selector: 'ss-form-room',
  templateUrl: './form-room.component.html',
  styleUrls: ['./form-room.component.scss']
})
export class FormRoomComponent implements OnInit {

  rooms: IAddRoom[] = [{ breakFast: false, dinner: false, extraService: false, lunch: false, facilitiesKindIds: [] }];
  roomId: number;
  // hotels: any[] = [];
  hotels: SelectItem[] = [];
  roomkinds: SelectItem[] = [];
  facilities: any[] = [];
  saving: boolean;
  submitted: boolean;

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
    this.aRoute.params.subscribe(prms => {
      if (prms.id > 0) {
        this.roomId = Number.parseInt(prms.id, 0);
        this.getRoom();
      }
    });
    this.getHotels({ query: '' });
    this.getRoomkinds();
    this.getFacilities({ query: '' });
  }

  submit(): void {
    let valid = true;
    this.rooms.forEach(room => {
      if (!room.hotelId || !room.kindId) {
        valid = false;
      }
    });
    if (valid) {
      const rooms = _.cloneDeep(this.rooms);
      rooms.forEach(room => {
        room.child = (room.child ?? 0);
        room.adult = (room.adult ?? 0);
        room.hotelId = room.hotelId.id;
        room.kindId = room.kindId.kindId;
        room.facilitiesKindIds = room.facilitiesKindIds?.map(f => f.kindId);
      });
      this.saving = true;
      this.srvHotel.addRoom({ rooms }).subscribe(res => {
        this.saving = false;
        this.srvMsg.add({ severity: 'success', summary: 'ثبت  اطلاعات', detail: 'ثبت اطلاعات با موفقیت انجام شد .' });
        this.router.navigate(['./panel/hotel/rooms']);
      }, () => {
        this.saving = false;
      });
    }
    this.submitted = true;
  }

  getRoom(): void {
    this.srvData.showMainProgressBarForMe();
    this.srvHotel.getRoom(this.roomId).subscribe(res => {
      this.hotels = res;
      this.srvData.thanksMainProgressBar();
    });
  }

  getHotels(event: any): void {
    this.srvSrch.getHotel(event.query).subscribe(res => {
      this.hotels = res.map(h => ({ label: h.title, value: h.id }));
    });
  }
  getRoomkinds(): void {
    this.srvSrch.getHotelRoomKind().subscribe(res => {
      this.roomkinds = res.map(t => ({ label: t.title, value: t.kindId }));
    });
  }

  getFacilities(event: any): void {
    this.srvSrch.getHotelRoomFacilitiesKind(event.query).subscribe(res => {
      this.facilities = res;
    });
  }

  addRoom(): void {
    this.confirmationService.confirm({
      target: event.target,
      message: 'اتاق جدید با اطلاعات اتاق اول پر شود؟',
      icon: 'pi pi-question-circle',
      acceptLabel: 'بله',
      rejectLabel: 'خیر',
      accept: () => {
        this.rooms.push({
          breakFast: this.rooms[0].breakFast,
          dinner: this.rooms[0].dinner,
          extraService: this.rooms[0].extraService,
          lunch: this.rooms[0].lunch,
          facilitiesKindIds: this.rooms[0].facilitiesKindIds,
          adult: this.rooms[0].adult,
          child: this.rooms[0].child,
          description: this.rooms[0].description,
          hotelId: this.rooms[0].hotelId,
          kindId: this.rooms[0].kindId
        });
      },
      reject: () => {
        this.rooms.push({ breakFast: false, dinner: false, extraService: false, lunch: false, facilitiesKindIds: [] });
      }
    });
  }

  removeRoom(index: number) {
    this.rooms.splice(index, 1);
  }

}
