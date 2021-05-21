import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { IAddrookind } from 'src/app/interfaces/add-roomkind.interface';
import { IRoomkind } from 'src/app/interfaces/roomkind.interface';
import { HotelService } from 'src/app/services';
import { CommonServiece } from 'src/app/services/common.service';

@Component({
  selector: 'ss-form-roomkind',
  templateUrl: './form-roomkind.component.html',
  styleUrls: ['./form-roomkind.component.scss']
})
export class FormRoomkindComponent implements OnInit {
  roomkind: IAddrookind = {};
  icons: SelectItem[];
  roomkindId: number;
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
        this.roomkindId = Number.parseInt(prms.id, 0);
        this.getroomkindById(this.roomkindId);
      }
    });
  }
  getroomkindById(id: number): void {
    this.srvHotel.getRoomkindById(id).subscribe(cou => {
      this.roomkind = cou;
    });
  }

  submit(): void {
    
    if (this.roomkind.title) {
      this.saving = true;
    if (this.roomkind.id > 0) {
      const obj: IAddrookind = {
        id: this.roomkind.id,
        fontIconId: this.roomkind.fontIconId,
        title: this.roomkind.title
      };
      this.srvHotel.addRomkind(obj).subscribe(() => {
        this.sMsg.add({ severity: 'success', summary: 'ویرایش انواع اتاق', detail: 'عملیات با موفقیت انجام شد' });
      });
    }
    else {
      this.roomkind.id = 0;
      const obj1: IRoomkind = {
        id: 0,
        fontIconId: this.roomkind.fontIconId,
        title: this.roomkind.title
      };
      this.srvHotel.addRomkind(obj1).subscribe(() => {
        this.sMsg.add({ severity: 'success', summary: 'ثبت انواع اتاق ', detail: 'عملیات با موفقیت انجام شد' });
        this.roomkind = {};
      });
    }
  }
  this.submitted=true;
}

}
