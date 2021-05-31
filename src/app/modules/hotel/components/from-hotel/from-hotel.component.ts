import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { HotelService, MediaService, SearchService, VehiclesService } from 'src/app/services';
import { icon, LatLng, latLng, Map, marker, point, polyline, tileLayer, Control, Util } from 'leaflet';
import { IAddHotel } from 'src/app/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { ILocation } from 'src/app/interfaces/location.interface';


@Component({
  selector: 'ss-from-hotel',
  templateUrl: './from-hotel.component.html',
  styleUrls: ['./from-hotel.component.scss']
})
export class FromHotelComponent implements OnInit {
  // Define our base layers so we can reference them multiple times
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
    zoom: 15,
    center: latLng([35.68490811606957, 51.38854980468751])
  };

  selectedPosition: any;
  saving: boolean;
  submitted: boolean;
  hotel: IAddHotel = { places: [], mediaIds: [] };
  hotelId: number;
  hotelTypes: SelectItem[] = [];
  locations: any[] = [];
  selectedLocation: ILocation;
  rates: any[] = [
    { name: 1, value: 1 },
    { name: 2, value: 2 },
    { name: 3, value: 3 },
    { name: 4, value: 4 },
    { name: 5, value: 5 },
    { name: 6, value: 6 }
  ];
  selectedRate: any;
  facilities: any[] = [];
  facilitiesKinds: any[] = [];
  vehicles: SelectItem[];
  places: any[];
  place: any = {};
  images: { mediaId: number, file: File, url: string }[] = [];
  mainImageIndex: number;

  constructor(
    private srvHotel: HotelService,
    private srvVehicle: VehiclesService,
    private srvSrch: SearchService,
    private srvMedia: MediaService,
    private srvMsg: MessageService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.getHotelType();
    this.getVehicles();
    this.aRoute.params.subscribe(prms => {
      if (prms.id > 0) {
        this.hotelId = Number.parseInt(prms.id, 0);
        this.getHotelById(this.hotelId);
      }
    });
  }

  confirmDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف این ردیف اطمینان دارید؟',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'بله',
      rejectLabel: 'نه',
      accept: () => {
        this.deletePlaces(id);
      }
    });
  }

  deletePlaces(index: number): void {
    this.hotel.places.splice(index, 1);
  }

  getHotelById(id: number): void {
    this.srvHotel.getHotelById(id).subscribe(hotel => {
      this.hotel = {
        hotelId: hotel.id,
        typeId: hotel.type.id,
        title: hotel.title,
        places: hotel.places.map(p => ({
          minute: p.minute,
          id: p.place.placeId,
          title: p.place.title,
          vehicleId: p.vehicle.vehicleId,
          vehicleTitle: p.vehicle.title
        })),
        address: hotel.address,
        phone: hotel.phone,
        latitude: hotel.latitude,
        longitude: hotel.longitude,
        mediaIds: hotel.mediaIds,
        mainMediaId: hotel.mainMediaId,
        facilitiesKindIds: hotel.facilities,
        description: hotel.description,
        state: hotel.state.id,
      };
      this.selectedLocation = hotel.location;
      this.facilitiesKinds = hotel.facilities.map(f => ({ kindId: f.id, title: f.title }));
      this.selectedRate = hotel.rate.id;
      this.images = hotel.mediaIds.map(id => ({
        mediaId: id,
        file: null,
        url: `http://beta-api.gozarino.com/v1/web/media/${id}`
      }));
      this.mainImageIndex = hotel.mediaIds.findIndex(id => id === this.hotel.mainMediaId);
    });
  }

  getHotelType(): void {
    this.srvHotel.getHotelType().subscribe(res => {
      this.hotelTypes = res.map(t => ({ label: t.title, value: t.typeId }));
    });
  }

  getLocations(event: any): void {
    this.srvSrch.getLocation(event.query).subscribe(res => {
      this.locations = res;
    });
  }

  getFacilities(event: any): void {
    this.srvSrch.getHotelFacilitiesKind(event.query).subscribe(res => {
      this.facilities = res;
    });
  }

  getPlaces(event: any): void {
    this.srvSrch.getPlaces(event.query).subscribe(res => {
      this.places = res;
    });
  }

  getVehicles(): void {
    this.srvVehicle.getVehicles().subscribe(res => {
      this.vehicles = res.map(r => ({ label: r.title, value: r.vehicleId }));
    });
  }

  onMapReady(map: Map): void {
    if (this.route.getBounds().isValid()) {
      map.fitBounds(this.route.getBounds(), {
        padding: point(24, 24),
        maxZoom: 30,
        animate: true
      });
    }
    this.tehran.on('dragend', (event) => {
      const mark = event.target;
      const position = mark.getLatLng();
      mark.setLatLng(new LatLng(position.lat, position.lng), { draggable: 'true' });
      map.panTo(new LatLng(position.lat, position.lng));
      this.selectedPosition = position;
      this.hotel.latitude = position.lat;
      this.hotel.longitude = position.lng;
    });
  }

  addPlace(): void {
    let add = true;
    for (let index = 0; index < this.hotel.places.length; index++) {
      const place = this.hotel.places[index];
      if ((place.id === this.place?.title?.placeId || place.title === this.place?.title) &&
        place.vehicleId === this.place.vehicleId &&
        place.minute === this.place.minute) {
        this.srvMsg.add({ severity: 'warn', summary: 'توجه', detail: 'لطفا موارد تکراری را وارد نکنید .' });
        add = false;
        break;
      }
    }
    if (add) {
      this.hotel.places.push({
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

  saveImages(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (this.images.length === 0) {
        resolve();
      }
      // save image that not exist.
      let i = 0;
      for await (const img of this.images.filter(im => !im.mediaId)) {
        const formData = new FormData();
        formData.append(`file`, img.file, img.file.name);
        const res = await this.srvMedia.upload(formData, 0).toPromise();
        if (!res) {
          this.srvMsg.add({ severity: 'warn', summary: 'توجه', detail: 'ثبت تصاویر با مشکل مواجه شد لطفا دوباره تلاش نمائید.' });
          this.saving = false;
          reject();
        }
        img.mediaId = res.mediaId;
        this.hotel.mediaIds.push(res.mediaId);
        if (i === this.mainImageIndex) {
          this.hotel.mainMediaId = res.mediaId;
        }
        i++;
      }
      resolve();
    });
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
    this.hotel.mediaIds = this.hotel.mediaIds.filter(id => id !== img.mediaId);
    if (this.hotel.mainMediaId === img.mediaId) {
      this.hotel.mainMediaId = 0;
    }
  }

  async submit(): Promise<void> {
    if (this.hotel.title && this.hotel.typeId && this.selectedRate &&
      this.selectedLocation && this.hotel.address) {
      this.saving = true;
      this.hotel.rate = this.selectedRate;
      this.hotel.locationId = this.selectedLocation?.locationId;
      this.hotel.isAdmin = true;
      if (this.selectedPosition) {
        this.hotel.latitude = this.selectedPosition.lat;
        this.hotel.longitude = this.selectedPosition.lng;
      }
      this.hotel.facilitiesKindIds = this.facilitiesKinds.map(f => f.kindId);
      // save images
      await this.saveImages();
      if (this.hotel.hotelId) {
        this.srvHotel.editHotel(this.hotel).subscribe(res => {
          this.saving = false;
          this.srvMsg.add({ severity: 'success', summary: 'ثبت  اطلاعات', detail: 'ثبت اطلاعات با موفقیت انجام شد .' });
          this.router.navigate(['./panel/hotel/hotels']);
        }, _ => {
          this.saving = false;
        });
      } else {
        this.srvHotel.addHotel(this.hotel).subscribe(res => {
          this.saving = false;
          this.srvMsg.add({ severity: 'success', summary: 'ثبت اطلاعات', detail: 'ثبت اطلاعات با موفقیت انجام شد .' });
          this.router.navigate(['./panel/hotel/hotels']);
        }, _ => {
          this.saving = false;
        });
      }
    }
    this.submitted = true;
  }

}
