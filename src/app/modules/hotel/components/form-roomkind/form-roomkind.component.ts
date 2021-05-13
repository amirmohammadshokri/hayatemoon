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
roomkind:IAddrookind= {};
icons:SelectItem[];
romkindId:number;
fontIconId:string;


  constructor(
    private srvHotel: HotelService,
    private sMsg: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private sComm:CommonServiece
   
  ) { }

  ngOnInit(): void {
    this.sComm.getIcons().subscribe(icons => {
      this.icons = icons;
    });
  }
 
  submit(): void {
    if (this.roomkind.id > 0) {
      const obj: IAddrookind = {
        id:this.roomkind.id,
         fontIconId:this.roomkind.fontIconId,
         title:this.roomkind.title
      };
      this.srvHotel.addRomkind(obj).subscribe(() => {
        this.sMsg.add({ severity: 'success', summary: 'ویرایش انواع اتاق', detail: 'عملیات با موفقیت انجام شد' });
        this.router.navigate(['./panel/hotel/list-roomkind']);
      });
    }
    else {
      this.roomkind.id = 0;
      const obj1: IRoomkind = {
        id:0,
        fontIconId:this.roomkind.fontIconId,
        title:this.roomkind.title
      };
      this.srvHotel.addRomkind(obj1).subscribe(() => {
        this.sMsg.add({ severity: 'success', summary: 'ثبت انواع اتاق ', detail: 'عملیات با موفقیت انجام شد' });
        this.router.navigate(['./panel/news']);
      });
    }
  }

}
