import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { IAddroomfacilitieskind } from 'src/app/interfaces/add-roomfacilitieskind.interface';
import { IRoomfacilitieskind } from 'src/app/interfaces/roomfacilitieskind.interface';
import { HotelService } from 'src/app/services';
import { CommonServiece } from 'src/app/services/common.service';
@Component({
  selector: 'ss-form-roomfacilitieskind',
  templateUrl: './form-roomfacilitieskind.component.html',
  styleUrls: ['./form-roomfacilitieskind.component.scss']
})
export class FormRoomfacilitieskindComponent implements OnInit {

  roomfacilitieskind: IAddroomfacilitieskind = {};
  icons: SelectItem[];
  roomfacilitieskindId: number;
  fontIconId: string;
  saving: boolean;
  submitted: boolean;

  constructor(
    private srvHotel: HotelService,
    private sMsg: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private sComm: CommonServiece
  ) { }

  ngOnInit(): void {
    this.sComm.getIcons().subscribe(icons => {
      this.icons = icons;
      
    });
    this.route.params.subscribe(prms => {
      if (prms.id > 0) {
        this.roomfacilitieskindId = Number.parseInt(prms.id, 0);
        this.getRoomfacilitieskindById(this.roomfacilitieskindId);
      }
    });
  }

  getRoomfacilitieskindById(id: number): void {
    this.srvHotel.getRoomfacilitieskindById(id).subscribe(cou => {
      this.roomfacilitieskind = cou;
    });
  }

  submit(): void {
    if (this.roomfacilitieskind.title) {
      this.saving = true;
    if (this.roomfacilitieskind.id > 0) {
      const obj: IAddroomfacilitieskind = {
        id: this.roomfacilitieskind.id,
        fontIconId: this.roomfacilitieskind.fontIconId,
        title: this.roomfacilitieskind.title
      };
      this.srvHotel.addRoomfacilitieskind(obj).subscribe(() => {
        this.sMsg.add({ severity: 'success', summary: 'ویرایش امکانات اتاق', detail: 'عملیات با موفقیت انجام شد' });
        this.roomfacilitieskind = {};
        this.router.navigate(['./panel/hotel/room-facilitieskinds']);
      });
    }
    else {
      this.roomfacilitieskind.id = 0;
      const obj1: IRoomfacilitieskind = {
        id: 0,
        fontIconId: this.roomfacilitieskind.fontIconId,
        title: this.roomfacilitieskind.title
      };
      this.srvHotel.addRoomfacilitieskind(obj1).subscribe(() => {
        this.sMsg.add({ severity: 'success', summary: 'ثبت امکانات اتاق ', detail: 'عملیات با موفقیت انجام شد' });
        this.router.navigate(['./panel/hotel/room-facilitieskinds']);
      });
    }
    
  }
  this.submitted=true;
}


}
