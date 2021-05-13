import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { HotelService, SearchService, VehiclesService } from 'src/app/services';
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

  hotel: IAddHotel = {};
  hotelTypes: SelectItem[] = [];
  locations: any[] = [];
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
  vehicles: SelectItem[];
  places: any[];

  constructor(
    private srvHotel: HotelService,
    private srvVehicle: VehiclesService,
    private srvSrch: SearchService
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
    this.srvSrch.getHotelRoomFacilitiesKind(event.query).subscribe(res => {
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

  }

  submit(): void {
    this.saving = true;
    // if (this.selectedPosition) {
    //   this.base.baseLocationLatitude = this.selectedPosition.lat;
    //   this.base.baseLocationLongitude = this.selectedPosition.lng;
    // }
    // this.sSet.setBase(this.base).subscribe(res => {
    //   this.saving = false;
    //   this.sMsg.add({ severity: 'success', summary: 'ثبت اطلاعات', detail: 'ثبت اطلاعات با موفقیت انجام شد .' });
    // });
  }

}
