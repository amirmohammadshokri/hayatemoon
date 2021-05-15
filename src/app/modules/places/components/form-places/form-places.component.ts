import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IAddPlaces } from 'src/app/interfaces/add-paces.interface';
import { PlacesService } from 'src/app/services';
import { CommonServiece } from 'src/app/services/common.service';

@Component({
  selector: 'ss-form-places',
  templateUrl: './form-places.component.html',
  styleUrls: ['./form-places.component.scss']
})
export class FormPlacesComponent implements OnInit {
  places: IAddPlaces[] = [];
  PlacesId: number;
  titleList: string[];


  constructor(
    private serPlaces: PlacesService,
    private sMsg: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private sComm: CommonServiece

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(prms => {
      if (prms.placeId > 0) {
        this.PlacesId = Number.parseInt(prms.placeId, 0);
        this.getPlacesById(this.PlacesId);
      }
    });
  }
  getPlacesById(id: number): void {
    this.serPlaces.getPlaces(id).subscribe(cou => {
      this.places = cou;
    });
  }

  submit(): void {
    this.serPlaces.addPlace({ titleList: this.titleList }).subscribe(res => {
      
    });
  }
   

  // submit(): void {
  //   if (this.places.placeId > 0) {
  //     const obj: IAddrookind = {
  //       id:this.roomkind.id,
  //        fontIconId:this.roomkind.fontIconId,
  //        title:this.roomkind.title
  //     };
  //     this.srvHotel.addRomkind(obj).subscribe(() => {
  //       this.sMsg.add({ severity: 'success', summary: 'ویرایش انواع اتاق', detail: 'عملیات با موفقیت انجام شد' });
  //       this.router.navigate(['./panel/hotel/list-roomkind']);
  //     });
  //   }
  //   else {
  //     this.roomkind.id = 0;
  //     const obj1: IRoomkind = {
  //       id:0,
  //       fontIconId:this.roomkind.fontIconId,
  //       title:this.roomkind.title
  //     };
  //     this.srvHotel.addRomkind(obj1).subscribe(() => {
  //       this.sMsg.add({ severity: 'success', summary: 'ثبت انواع اتاق ', detail: 'عملیات با موفقیت انجام شد' });
  //       this.router.navigate(['./panel/news']);
  //     });
  //   }
  // }

}
