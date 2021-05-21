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

  hotelfacilitieskind: IAddhotelfacilitieskind = {};
  icons: SelectItem[];
  romfacilitieskindId: number;
  fontIconId: string;
  submitted: boolean;
  saving: boolean;

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
      this.sComm.getIcons().subscribe(icons => {
        this.icons = icons;
      });
      if (prms.id > 0) {
        this.romfacilitieskindId = Number.parseInt(prms.id, 0);
        this.getHotelFacilitiesById(this.romfacilitieskindId);
      }
    });

  }
  getHotelFacilitiesById(id: number): void {
    this.srvHotel.getHotelfacilitieskindById(id).subscribe(cou => {
      this.hotelfacilitieskind = cou;
    });
  }

  submit(): void {
    if (this.hotelfacilitieskind.id > 0) {
      const obj: IAddhotelfacilitieskind = {
        id: this.romfacilitieskindId,
        fontIconId: this.hotelfacilitieskind.fontIconId,
        title: this.hotelfacilitieskind.title
      };
      this.submitted = true;
      if (this.hotelfacilitieskind.title) {
        this.saving = true;
        this.srvHotel.addHotelfacilitieskind(obj).subscribe(() => {
          this.sMsg.add({ severity: 'success', summary: 'ویرایش امکانات هتل', detail: 'عملیات با موفقیت انجام شد' });
        });
      }
    }
    else {
      this.hotelfacilitieskind.id = 0;
      const obj1: IHotelfacilitieskind = {
        hotelFacilityKindId: 0,
        fontIconId: this.hotelfacilitieskind.fontIconId,
        title: this.hotelfacilitieskind.title
      };
      this.srvHotel.addHotelfacilitieskind(obj1).subscribe(() => {
        this.sMsg.add({ severity: 'success', summary: 'ثبت امکانات هتل ', detail: 'عملیات با موفقیت انجام شد' });
        this.hotelfacilitieskind = {};
        this.submitted = false;
      });
    }
  }

}
