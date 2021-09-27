import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { IVehicles } from 'src/app/interfaces/add-Vehicles.interface';
import { CommonServiece, DataService, TourService, VehiclesService } from 'src/app/services';

@Component({
  selector: 'ss-form-vehicels',
  templateUrl: './form-vehicels.component.html',
  styleUrls: ['./form-vehicels.component.scss']
})
export class FormVehicelsComponent implements OnInit {

  addVehicles: IVehicles ={fontIconId: 'fa fa-th'};
  icons: SelectItem[];
  vehicleId: number;
  fontIconId: string;
  saving: boolean;
  submitted: boolean;
  tourTypes: SelectItem[] = [];
  

  constructor(
    private srvData: DataService,
    private srvTour: TourService,
    private srvVehicles: VehiclesService,
    private sMsg: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private sComm: CommonServiece

  ) { }

  ngOnInit(): void {
    this.sComm.getIcons().subscribe(icons => {
      this.icons = icons;
    });
    this.getTourType();
    this.route.params.subscribe(prms => {
      if (prms.id > 0) {
        this.vehicleId = Number.parseInt(prms.id, 0);
        this.getVehiclesById(this.vehicleId);
      }
    });
    
  }
  getVehiclesById(id: number): void {
    this.srvVehicles.getVehiclesById(id).subscribe(cou => {
      console.log('cou',cou.tourType.id);
      this.addVehicles = {
        id:cou.vehicleId,
        title:cou.title,
        tourType: cou.tourType.id,
        fontIconId:cou.fontIconId
      };
    });
  }

  getTourType(): void {
    this.srvData.showMainProgressBarForMe();
    this.srvTour.getTourType().subscribe(res => {
      this.tourTypes = res.map(t => ({ label: t.title, value: t.id }));
      this.srvData.thanksMainProgressBar();
    });
  }


  submit(): void {
    if (this.addVehicles.title) {
      this.saving = true;
    if (this.addVehicles.id > 0) {
      console.log('amiiiiiir',this.addVehicles.id);
      
      // const obj: IVehicles = {
      //   id: this.addVehicles.id,
      //   fontIconId: this.addVehicles.fontIconId,
      //   title: this.addVehicles.title,
      //   tourType:this.addVehicles.tourType   
      //    };
      this.srvVehicles.addVehicle(this.addVehicles).subscribe(() => {
        this.sMsg.add({ severity: 'success', summary: 'وسیله نقلیه', detail: 'عملیات با موفقیت انجام شد' });
        this.router.navigate(['./panel/vehicels/vehicels']);

      });
    }
    else {
      this.addVehicles.id = 0;
      // const obj1: IVehicles = {
      //   id: 0,
      //   fontIconId: this.addVehicles.fontIconId,
      //   title: this.addVehicles.title
      // };
      this.srvVehicles.addVehicle(this.addVehicles).subscribe(() => {
        this.sMsg.add({ severity: 'success', summary: 'ثبت وسیه نقلیه  ', detail: 'عملیات با موفقیت انجام شد' });
        this.addVehicles = {};
        this.router.navigate(['./panel/vehicels/vehicels']);
      });
    }
  }
  this.submitted=true;
}

}
