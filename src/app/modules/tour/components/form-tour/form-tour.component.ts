import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { IAddTour } from 'src/app/interfaces';
import { CurrencyService, MediaService, SearchService, TourService, VehiclesService } from 'src/app/services';

@Component({
  selector: 'ss-form-tour',
  templateUrl: './form-tour.component.html',
  styleUrls: ['./form-tour.component.scss']
})
export class FormTourComponent implements OnInit {

  tour: IAddTour = { tourMediaIds: [], price: [{}], vehicles: [] };
  saving: boolean;
  locations: any[] = [];
  fromLocation: any;
  toLocation: any;
  tourTypes: SelectItem[];
  categories: any[];
  selectedCategory: SelectItem;
  fromDate: any;
  toDate: any;
  vehicels: any[];
  goVehicels: any[];
  backVehicels: any[];
  hotels: any[] = [];
  selectedHotel: any;
  selectedRoom: any;
  rooms: any[] = [];
  images: { mediaId: number, file: File, url: string }[] = [];
  currencies: SelectItem[] = [];
  mainImageIndex: number;

  constructor(
    private srvSrch: SearchService,
    private srvMedia: MediaService,
    private srvMsg: MessageService,
    private srvTour: TourService,
    private srvVehicle: VehiclesService,
    private srvCurrency: CurrencyService
  ) { }

  ngOnInit(): void {
    this.getTourType();
    this.getVehicles();
    this.getCurrency();
  }

  getCategories(event: any): void {
    this.srvSrch.getToueCategories(event.query).subscribe(res => {
      this.categories = res;
    });
  }

  getHotels(event: any): void {
    this.srvSrch.getHotel(event.query).subscribe(res => {
      this.hotels = res;
    });
  }

  getRooms(event: any): void {
    this.srvSrch.getHotelRooms(this.selectedHotel?.id, event.query).subscribe(res => {
      this.rooms = res;
    });
  }

  getTourType(): void {
    this.srvTour.getTourType().subscribe(res => {
      this.tourTypes = res.map(t => ({ label: t.title, value: t.typeId }));
    });
  }

  getVehicles(): void {
    this.srvVehicle.getVehicles().subscribe(res => {
      this.vehicels = res;
    });
  }

  getLocations(event: any): void {
    this.srvSrch.getLocation(event.query).subscribe(res => {
      this.locations = res;
    });
  }

  getCurrency(): void {
    this.srvCurrency.get().subscribe(res => {
      this.currencies = res.map(t => ({ label: t.title, value: t.typeId }));
    });
  }

  addPrice(): void {
    this.tour.price.push({});
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

  async submit(): Promise<void> {
    this.saving = true;
    this.tour.fromLocationId = this.fromLocation.locationId;
    this.tour.toLocationId = this.toLocation.locationId;
    const startDate: Date = this.fromDate._d;
    const utcFromDate = new Date(startDate.toUTCString());
    this.tour.startDate = utcFromDate.toISOString();
    const endDate: Date = this.toDate._d;
    const utcendDate = new Date(endDate.toUTCString());
    this.tour.endDate = utcendDate.toISOString();
    this.goVehicels.forEach(vehicle => {
      this.tour.vehicles.push({ type: 0, vehicleId: vehicle.vehicleId });
    });
    this.backVehicels.forEach(vehicle => {
      this.tour.vehicles.push({ type: 1, vehicleId: vehicle.vehicleId });
    });

    await this.saveImages();
    this.srvTour.addTour(this.tour).subscribe(res => {
      this.srvMsg.add({ severity: 'success', summary: 'ثبت اطلاعات', detail: 'ثبت اطلاعات با موفقیت انجام شد .' });
      this.saving = false;
      this.tour = { tourMediaIds: [], price: [{}], vehicles: [] };
    });
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
        this.tour.tourMediaIds.push(res.mediaId);
        if (i === this.mainImageIndex) {
          this.tour.mainImageId = res.mediaId;
        }
        i++;
      }
      resolve();
    });
  }

}
