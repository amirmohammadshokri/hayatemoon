import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IAddPlaces } from 'src/app/interfaces/add-paces.interface';
import { PlacesService } from 'src/app/services';

@Component({
  selector: 'ss-form-places',
  templateUrl: './form-places.component.html',
  styleUrls: ['./form-places.component.scss']
})
export class FormPlacesComponent implements OnInit {
  places: IAddPlaces[] = [];
  PlacesId: number;
  titleList: string[];
  saving: boolean;
  sumbited:boolean;


  constructor(
    private serPlaces: PlacesService,
    private route: ActivatedRoute,
    private srvMsg: MessageService,
    private router: Router,
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
    console.log(id+'dsddsdsd');
    
    this.serPlaces.getPlaces(id).subscribe(cou => {
 
      this.places = cou;
    });
  }

  submit(): void {
    if(this.titleList){
      this.saving = true;
    this.serPlaces.addPlace({ titleList: this.titleList }).subscribe(res => {
      this.saving = false;
      this.srvMsg.add({ severity: 'success', summary: 'ثبت اطلاعات', detail: 'ثبت اطلاعات با موفقیت انجام شد .' });
      this.titleList = [];
      this.router.navigate(['./panel/places/places']);
    });
    }
    this.sumbited==true;

    
  }

}
