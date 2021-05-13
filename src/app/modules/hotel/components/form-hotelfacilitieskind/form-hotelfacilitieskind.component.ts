import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { IAddhotelfacilitieskind } from 'src/app/interfaces/add-hotelfacilitieskind.interface';
import { IHotelfacilitieskind } from 'src/app/interfaces/hotelfacilitieskind.interface';
import { HotelService } from 'src/app/services';
import { CommonServiece } from 'src/app/services/common.service';

@Component({
  selector: 'ss-form-hotelfacilitieskind',
  templateUrl: './form-hotelfacilitieskind.component.html',
  styleUrls: ['./form-hotelfacilitieskind.component.scss']
})
export class FormHotelfacilitieskindComponent implements OnInit {

  
  hotelfacilitieskind:IAddhotelfacilitieskind= {};
  icons:SelectItem[];
  romfacilitieskindId:number;
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
      if (this.hotelfacilitieskind.id > 0) {
        const obj: IAddhotelfacilitieskind = {
          id:this.romfacilitieskindId,
           fontIconId:this.hotelfacilitieskind.fontIconId,
           title:this.hotelfacilitieskind.title
        };
        this.srvHotel.addHotelfacilitieskind(obj).subscribe(() => {
          this.sMsg.add({ severity: 'success', summary: 'ویرایش امکانات هتل', detail: 'عملیات با موفقیت انجام شد' });
          this.router.navigate(['./panel/hotel/list-hotelfacilitieskind']);
        });
      } 
      else {
        this.hotelfacilitieskind.id = 0;
        const obj1: IHotelfacilitieskind = {
          hotelFacilityKindId:0,
          fontIconId:this.hotelfacilitieskind.fontIconId,
          title:this.hotelfacilitieskind.title
        };
        this.srvHotel.addHotelfacilitieskind(obj1).subscribe(() => {
          this.sMsg.add({ severity: 'success', summary: 'ثبت امکانات هتل ', detail: 'عملیات با موفقیت انجام شد' });
          this.router.navigate(['./panel/']);
        });
      }
    }
  
}
