import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PlacesService } from 'src/app/services';

@Component({
  selector: 'ss-form-places',
  templateUrl: './form-places.component.html',
  styleUrls: ['./form-places.component.scss']
})
export class FormPlacesComponent implements OnInit {
  placeId: number;
  titleList: string[];
  saving: boolean;
  submitted: boolean;
  place: string;

  constructor(
    private srvPlace: PlacesService,
    private route: ActivatedRoute,
    private router: Router,
    private srvMsg: MessageService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(prms => {
      if (prms.id > 0) {
        this.placeId = Number.parseInt(prms.id, 0);
        this.getPlacesById(this.placeId);
      }
    });
  }

  getPlacesById(id: number): void {
    this.srvPlace.getPlace(id).subscribe(cou => {
      this.place = cou.title;
    });
  }

  submit(): void {
    if (this.placeId) {
      if (this.place) {
        this.saving = true;
        this.srvPlace.editPlaces(this.placeId, { placeId: this.placeId, title: this.place }).subscribe(res => {
          this.saving = false;
          this.srvMsg.add({ severity: 'success', summary: 'ثبت اطلاعات', detail: 'ثبت اطلاعات با موفقیت انجام شد .' });
          this.router.navigate(['../panel/places/places']);
        });
      }
    } else {
      if (this.titleList.length > 0) {
        this.saving = true;
        this.srvPlace.addPlace({ titleList: this.titleList }).subscribe(res => {
          this.saving = false;
          this.srvMsg.add({ severity: 'success', summary: 'ثبت اطلاعات', detail: 'ثبت اطلاعات با موفقیت انجام شد .' });
          this.router.navigate(['../panel/places/places']);
        });
      }
    }
    this.submitted = true;
  }

}
