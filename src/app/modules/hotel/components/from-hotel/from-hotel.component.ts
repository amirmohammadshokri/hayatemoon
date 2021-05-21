import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { HotelService, MediaService, SearchService, VehiclesService } from 'src/app/services';
import { icon, LatLng, latLng, Map, marker, point, polyline, tileLayer } from 'leaflet';
import { IAddHotel } from 'src/app/interfaces';

@Component({
  selector: 'ss-from-hotel',
  templateUrl: './from-hotel.component.html',
  styleUrls: ['./from-hotel.component.scss']
})
export class FromHotelComponent implements OnInit {
  // Define our base layers so we can reference them multiple times
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

  selectedPosition: any;
  saving: boolean;
  hotel: IAddHotel = { places: [], hotelMediaIds: [] };
  hotelTypes: SelectItem[] = [];
  locations: any[] = [];
  selectedLocation: any;
  rates: any[] = [
    { name: 1, value: 1 },
    { name: 2, value: 2 },
    { name: 3, value: 3 },
    { name: 4, value: 4 },
    { name: 5, value: 5 },
    { name: 6, value: 6 },
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
    private srvMsg: MessageService
  ) { }

  ngOnInit(): void {
    this.getHotelType();
    this.getVehicles();
  }

  getHotel(): void {

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

  addPlace(): void {
    this.hotel.places.push({
      minute: this.place.minute,
      id: this.place?.title?.placeId,
      title: (this.place?.title?.title ?? this.place?.title),
      vehicleId: this.place.vehicleId,
      vehicleTitle: this.vehicles?.find(v => v.value === this.place?.vehicleId)?.label
    });
    this.place = {};
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
        this.hotel.hotelMediaIds.push(res.mediaId);
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
  }

  async submit(): Promise<void> {
    this.saving = true;
    this.hotel.rate = this.selectedRate?.value;
    this.hotel.locationId = this.selectedLocation?.locationId;
    this.hotel.isAdmin = true;
    if (this.selectedPosition) {
      this.hotel.latitude = this.selectedPosition.lat;
      this.hotel.longitude = this.selectedPosition.lng;
    }
    this.hotel.facilitiesKindIds = this.facilitiesKinds.map(f => f.kindId);
    // save images
    await this.saveImages();
    this.srvHotel.addHotel(this.hotel).subscribe(res => {
      this.saving = false;
      this.srvMsg.add({ severity: 'success', summary: 'ثبت اطلاعات', detail: 'ثبت اطلاعات با موفقیت انجام شد .' });
      this.hotel = { places: [], hotelMediaIds: [] };
    }, _ => {
      this.saving = false;
    });
  }

}
