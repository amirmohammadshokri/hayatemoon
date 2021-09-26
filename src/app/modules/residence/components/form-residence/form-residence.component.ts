import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { icon, latLng, marker, Map, point, polyline, tileLayer, LatLng } from 'leaflet';
import { MessageService, SelectItem } from 'primeng/api';
import { IAddResidence } from 'src/app/interfaces/add-residence.interface';
import { DataService, MediaService, SearchService, VehiclesService } from 'src/app/services';
import { ResidenceService } from 'src/app/services/residence.service';
import * as moment from 'jalali-moment';
import * as _ from 'lodash';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'ss-form-residence',
  templateUrl: './form-residence.component.html',
  styleUrls: ['./form-residence.component.scss']
})
export class FormResidenceComponent implements OnInit {

  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { detectRetina: true });
  wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', { detectRetina: true });

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
    zoom: 10,
    center: latLng([35.68490811606957, 51.38854980468751])
  };
  map: Map;
  mainImageIndex: number = 0;
  selectedPosition: any;
  saving: boolean;
  residence: IAddResidence = { mediaIds: [], places: [], prices: {} };
  locations: any[] = [];
  selectedLocation: any;
  facilities: any[] = [];
  facilitiesKinds: any[] = [];
  existRules: { id: number, rule: string }[] = [];
  vehicles: SelectItem[];
  places: any[];
  images: { mediaId: number, file: File, url: string }[] = [];
  place: any = {};
  residenceId: number;
  submitted: boolean;


  constructor(
    private srvData: DataService,
    private srvResidence: ResidenceService,
    private srvMedia: MediaService,
    private srvMsg: MessageService,
    private srvVehicle: VehiclesService,
    private srvSrch: SearchService,
    private aRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getVehicles();
    this.aRoute.params.subscribe(prms => {
      if (prms.id > 0) {
        this.residenceId = Number.parseInt(prms.id, 0);
        this.getResidence();
      }
    });
    this.getFacilities({ query: '' });
  }

  getResidence(): void {
    this.srvData.showMainProgressBarForMe();
    this.srvResidence.getResidence(this.residenceId).subscribe(res => {
      this.residence = {
        title: res.title,
        address: res.address,
        phone: res.phone,
        latitude: res.latitude,
        longitude: res.longitude,
        mediaIds: res.mediaIds,
        mainMediaId: res.mainMediaId,
        places: res.places.map(p => ({
          minute: p.minute,
          id: p.place.placeId,
          title: p.place.title,
          vehicleId: p.vehicle.vehicleId,
          vehicleTitle: p.vehicle.title
        })),
        description: res.description,
        fromEntranceHour: res.fromEntranceHour,
        toEntranceHour: res.toEntranceHour,
        leavingHour: res.leavingHour,
        rules: res.rules.map(r => r.rule),
        prices: (res.basePrice ?? {}),
        isAdmin: res.isAdmin
      };
      this.facilitiesKinds = res.facilities.map(f => ({ kindId: f.id, title: f.title }));
      this.residence.prices.priceRules = res.priceRules.map(p => ({
        price: p.price,
        from: moment(p.fromPersianDate, 'jYYYY/jMM/jDD'),
        to: moment(p.toPersianDate, 'jYYYY/jMM/jDD')
      }));

      this.existRules = res.rules;
      this.selectedLocation = res.location;
      this.images = res.mediaIds.map(id => ({
        mediaId: id,
        file: null,
        url: `https://api.gashtineh.com/v1/web/media/${id}`
      }));
      this.mainImageIndex = res.mediaIds.findIndex(id => id === this.residence.mainMediaId);
      this.mainImageIndex = (this.mainImageIndex >= 0 ? this.mainImageIndex : 0)
      this.srvData.thanksMainProgressBar();
    });
  }

  getVehicles(): void {
    this.srvData.showMainProgressBarForMe();
    this.srvVehicle.getVehicles().subscribe(res => {
      this.vehicles = res.map(r => ({ label: r.title, value: r.vehicleId }));
      this.srvData.thanksMainProgressBar();
    });
  }

  getLocations(event: any): void {
    this.srvData.showMainProgressBarForMe();
    this.srvSrch.getLocation(event.query).subscribe(res => {
      this.locations = res;
      this.srvData.thanksMainProgressBar();
    });
  }

  setMapAddress(): void {
    var lat = (+this.selectedLocation.latitude);
    var lng = (+this.selectedLocation.longitude);
    var newLatLng = new LatLng(lat, lng);
    this.tehran.setLatLng(newLatLng);

    // zoom on location
    this.map.panTo(new LatLng(lat, lng));

    // set hotel
    this.selectedPosition = { lat, lng };
    this.residence.latitude = lat;
    this.residence.longitude = lng;
  }

  onMapReady(map: Map): void {
    this.map = map;
    this.tehran.on('dragend', (event) => {
      const mark = event.target;
      const position = mark.getLatLng();
      mark.setLatLng(new LatLng(position.lat, position.lng), { draggable: 'true' });
      map.panTo(new LatLng(position.lat, position.lng));
      this.selectedPosition = position;
    });
  }

  getFacilities(event: any): void {
    this.srvSrch.getResidenceFacilitiesKind(event.query).subscribe(res => {
      this.facilities = res;
    });
  }

  getPlaces(event: any): void {
    this.srvSrch.getPlaces(event.query).subscribe(res => {
      this.places = res;
    });
  }

  addPlace(): void {
    let add = true;
    for (let index = 0; index < this.residence.places.length; index++) {
      const place = this.residence.places[index];
      if ((place.id === this.place?.title?.placeId || place.title === this.place?.title) &&
        place.vehicleId === this.place.vehicleId &&
        place.minute === this.place.minute) {
        this.srvMsg.add({ severity: 'warn', summary: 'توجه', detail: 'لطفا موارد تکراری را وارد نکنید .' });
        add = false;
        break;
      }
    }
    if (add) {
      this.residence.places.push({
        minute: this.place.minute,
        id: this.place?.title?.placeId,
        title: (this.place?.title?.title ?? this.place?.title),
        vehicleId: this.place.vehicleId,
        vehicleTitle: this.vehicles?.find(v => v.value === this.place?.vehicleId)?.label
      });
      this.place = {};
    }
  }

  defaultImg(row: any): void {
    row.url = 'assets/no-image.png';
  }

  addImage(e: any): void {
    for (let index = 0; index < e.target.files.length; index++) {
      const file = e.target.files[index];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.images.push({ mediaId: null, url: event.target.result, file: file });
      };
      reader.readAsDataURL(file);
    }
  }

  deleteImage(img: any, id: number): void {
    this.images.splice(id, 1);
    this.residence.mediaIds = this.residence.mediaIds.filter(id => id !== img.mediaId);
    if (this.residence.mainMediaId === img.mediaId) {
      this.residence.mainMediaId = 0;
    }
  }

  addPrice(): void {
    if (!this.residence.prices.priceRules) {
      this.residence.prices.priceRules = [];
    }
    this.residence.prices.priceRules.push({});
  }

  savePrice(): void {
    this.saving = true;
    const prices = {
      id: this.residenceId,
      prices: this.residence.prices,
      isAdmin: true
    };
    this.srvResidence.editPrice(prices).subscribe(() => {
      this.srvMsg.add({ severity: 'success', summary: 'ویرایش مبالغ', detail: 'عملیات با موفقیت انجام شد' });
      this.saving = false;
    }, () => {
      this.saving = false;
    });
  }

  removePrice(index: number): void {
    this.residence.prices.priceRules.splice(index, 1);
  }

  removePlace(index: number): void {
    this.residence.places.splice(index, 1);
  }

  saveImages(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (this.images.length === 0) {
        resolve();
      } else {
        const calls = [];
        const newImages = this.images.filter(im => !im.mediaId);
        if (!newImages || newImages.length == 0) {
          resolve();
        }
        for (const img of newImages) {
          const formData = new FormData();
          formData.append(`file`, img.file, img.file.name);
          calls.push(this.srvMedia.upload(formData, 0));
        }
        forkJoin(calls).subscribe(res => {
          const key = 'mediaId';
          for (let index = 0; index < res.length; index++) {
            newImages[index].mediaId = res[index][key];
            this.residence.mediaIds.push(res[index][key]);
          }
          resolve();
        }, () => {
          this.saving = false;
          reject();
        });
      }
    });
  }

  submit(): void {
    if (this.residence.title && this.selectedLocation && this.residence.phone && this.residence.fromEntranceHour
      && this.residence.toEntranceHour && this.residence.leavingHour && this.residence.address) {
      this.saving = true;
      this.residence.locationId = this.selectedLocation?.locationId;
      this.residence.phone = this.residence.phone.replace('-', '');

      this.residence.isAdmin = true;
      if (this.selectedPosition) {
        this.residence.latitude = this.selectedPosition.lat;
        this.residence.longitude = this.selectedPosition.lng;
      }
      this.residence.prices?.priceRules?.forEach(role => {
        const from: Date = role.from?._d;
        const utcFrom = new Date(from.toUTCString());
        role.from = utcFrom.toISOString();
        const to: Date = role.to?._d;
        const utcTo = new Date(to.toUTCString());
        role.to = utcTo.toISOString();
      });
      this.residence.facilitiesKindIds = this.facilitiesKinds.map(f => f.kindId);
      // save images
      this.saveImages().then(() => {
        this.residence.mainMediaId = this.residence.mediaIds[this.mainImageIndex];
        if (this.residenceId > 0) {
          this.residence.id = this.residenceId;
          const rules = [];
          this.residence.rules.forEach(rule => {
            const index = this.existRules.findIndex(r => r.rule === rule);
            if (index > -1) {
              rules.push(this.existRules[index]);
            } else {
              rules.push({ id: 0, rule });
            }
          });
          const residence = _.cloneDeep(this.residence);
          residence.rules = rules;
          console.log(residence);

          this.srvResidence.editResidence(residence).subscribe(() => {
            this.srvMsg.add({ severity: 'success', summary: 'ویرایش اقامتگاه', detail: 'عملیات با موفقیت انجام شد' });
            this.saving = false;
            this.router.navigate(['./panel/residence/residence']);
          }, () => {
            this.saving = false;
          });
        } else {
          this.srvResidence.addResidence(this.residence).subscribe(() => {
            this.srvMsg.add({ severity: 'success', summary: 'ثبت اقامتگاه', detail: 'عملیات با موفقیت انجام شد' });
            this.saving = false;
            this.router.navigate(['./panel/residence/residence']);
          }, () => {
            this.saving = false;
          });
        }
      })
    }
    this.submitted = true;
  }

}
