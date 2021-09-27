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

  addVehicles: IVehicles = { fontIconId: 'fa fa-th' };
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
      this.vehicleId = +prms.id;
      if (this.vehicleId > 0) {
        this.getVehiclesById();
      }
    });
  }

  getVehiclesById(): void {
    this.srvVehicles.getVehiclesById(this.vehicleId).subscribe(cou => {
      this.addVehicles = {
        id: cou.vehicleId,
        title: cou.title,
        tourType: cou.tourType.id,
        fontIconId: cou.fontIconId
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
      this.srvVehicles.addVehicle(this.addVehicles).subscribe(() => {
        this.sMsg.add({ severity: 'success', summary: 'وسیله نقلیه', detail: 'عملیات با موفقیت انجام شد' });
        this.router.navigate(['./panel/vehicels/vehicels']);
      }, () => {
        this.saving = false;
      });
    }
    this.submitted = true;
  }

}
