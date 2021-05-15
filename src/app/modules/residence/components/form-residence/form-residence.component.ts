import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { icon, latLng, marker,Map, point, polyline, tileLayer, LatLng } from 'leaflet';
import { MessageService, SelectItem } from 'primeng/api';
import { IAddResidence } from 'src/app/interfaces/add-residence.interface';
import { MediaService, SearchService, VehiclesService } from 'src/app/services';
import { ResidenceService } from 'src/app/services/residence.service';

@Component({
  selector: 'ss-form-residence',
  templateUrl: './form-residence.component.html',
  styleUrls: ['./form-residence.component.scss']
})
export class FormResidenceComponent implements OnInit {

  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&amp;copy; &lt;a href="https://www.openstreetmap.org/copyright"&gt;OpenStreetMap&lt;/a&gt; contributors'
  });
  wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&amp;copy; &lt;a href="https://www.openstreetmap.org/copyright"&gt;OpenStreetMap&lt;/a&gt; contributors'
  });

  // Marker for tehran
  tehran = marker([35.68490811606957, 51.38854980468751], {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'leaflet/marker-icon.png',
      iconRetinaUrl: 'leaflet/marker-icon-2x.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    }),
    draggable: true
  });

  // Path from paradise to tehran
  route = polyline([]);

  // Layers control object with our two base layers and the three overlay layers
  layersControl = {
    baseLayers: {
      'Street Maps': this.streetMaps,
      'Wikimedia Maps': this.wMaps
    },
    overlays: {
      تهران: this.tehran
    }
  };

  // Set the initial set of displayed layers (we could also use the leafletLayers input binding for this)
  options = {
    layers: [this.streetMaps, this.tehran],
    zoom: 5,
    center: latLng([35.68490811606957, 51.38854980468751])
  };
  mainImageIndex: number;
  selectedPosition: any;
  saving: boolean;
  residence: IAddResidence = {};
  locations: any[] = [];
  facilities: any[] = [];
  vehicles: SelectItem[];
  places: any[];
  images: { mediaId: number, file: File, url: string }[] = [];
  roles: string[];

  constructor(
    private srvResidence: ResidenceService,
    private srvMedia: MediaService,
    private sMsg: MessageService,
    private srvVehicle: VehiclesService,
    private srvSrch: SearchService,
    private router: Router,


  ) { }

  ngOnInit(): void {
    this.getVehicles();
  }
  getVehicles(): void {
    this.srvVehicle.getVehicles().subscribe(res => {
      this.vehicles = res.map(r => ({ label: r.title, value: r.vehicleId }));
    });
  }
async submit():Promise<void>
{
  this.saving=true;
  this.saveImages();
  const obj: IAddResidence = {
title:this.residence.title,
phone:this.residence.phone,
address:this.residence.address,
description:this.residence.description,
fromEntranceHour:this.residence.fromEntranceHour,
toEntranceHour:this.residence.toEntranceHour,
facilitiesKindIds:this.facilities,
leavingHour:this.residence.leavingHour,
rules:this.roles
    }
    this.srvResidence.addResidence(obj).subscribe(() => {
      this.sMsg.add({ severity: 'success', summary: 'ثبت اقامتگاه', detail: 'عملیات با موفقیت انجام شد' });
      this.router.navigate(['./panel/residence/list-residence']);
    });

  
}
 
saveImages(): Promise<void> {
  return new Promise(async (resolve, reject) => {
    if (this.images.length === 0) {
      resolve();
    }
    const formData = new FormData();
    // save image that not exist.
    this.images.filter(i => !i.mediaId).forEach((img, i) => {
      formData.append(`file`, img.file, img.file.name);
    });
    const res = await this.srvMedia.upload(formData, 0).toPromise();
    if (!res) {
      this.sMsg.add({ severity: 'warn', summary: 'توجه', detail: 'ثبت تصاویر با مشکل مواجه شد لطفا دوباره تلاش نمائید.' });
      this.saving = false;
      reject();
    }
    res.forEach(element => {
      
    });
    this.residence.mediaIds=res.mediaId;
    this.residence.mainMediaId[this.mainImageIndex].isMain = true;
    resolve();
  });
}

  getLocations(event: any): void {
    this.srvSrch.getLocation(event.query).subscribe(res => {
      this.locations = res;
    });
  }
  onMapReady(map: Map): void {
    if (this.route.getBounds().isValid()) {
      map.fitBounds(this.route.getBounds(), {
        padding: point(24, 24),
        maxZoom: 15,
        animate: true
      });
    }
    this.tehran.on('dragend', (event) => {
      const mark = event.target;
      const position = mark.getLatLng();
      mark.setLatLng(new LatLng(position.lat, position.lng), { draggable: 'true' });
      map.panTo(new LatLng(position.lat, position.lng));
      this.selectedPosition = position;
    });
  }
  getPlaces(event: any): void {
    this.srvSrch.getPlaces(event.query).subscribe(res => {
      this.places = res;
    });
  }
  addPlace(): void {

  }
  addImage(e: any): void {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.images.push({ mediaId: null, url: event.target.result, file: e.target.files[0] });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  deleteImage(img: any, id: number): void {
    this.images.splice(id, 1);
  }

}
