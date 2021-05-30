import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { IAddTour } from 'src/app/interfaces';
import { CurrencyService, DataService, MediaService, SearchService, TourService, VehiclesService } from 'src/app/services';
import * as moment from 'jalali-moment';

@Component({
  selector: 'ss-form-tour',
  templateUrl: './form-tour.component.html',
  styleUrls: ['./form-tour.component.scss']
})
export class FormTourComponent implements OnInit {

  tour: IAddTour = { isForeign: false, isInstallments: false, tourMediaIds: [], price: {}, vehicles: [] };
  saving: boolean;
  submitted: boolean;
  locations: any[] = [];
  fromLocation: any;
  toLocation: any;
  tourTypes: SelectItem[] = [];
  categories: any[];
  selectedCategories: any[];
  fromDate: any;
  toDate: any;
  vehicels: any[];
  goVehicels: any[];
  backVehicels: any[];
  hotels: any[] = [];
  selectedHotel: any;
  selectedRoom: any[];
  rooms: any[] = [];
  images: { mediaId: number, file: File, url: string }[] = [];
  currencies: SelectItem[] = [];
  mainImageIndex: number;
  tourId: number;

  constructor(
    private srvData: DataService,
    private srvSrch: SearchService,
    private srvMedia: MediaService,
    private srvMsg: MessageService,
    private srvTour: TourService,
    private srvVehicle: VehiclesService,
    private srvCurrency: CurrencyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTourType();
    this.getVehicles();
    this.getCurrency();
    this.route.params.subscribe(prms => {
      if (prms.id > 0) {
        this.tourId = Number.parseInt(prms.id, 0);
        this.getTour();
      }
    });
  }

  getTour(): void {
    this.srvData.showMainProgressBarForMe();
    this.srvTour.getTour(this.tourId).subscribe(res => {
      this.tour = {
        isForeign: res.isForeign,
        isInstallments: res.isInstallments,
        title: res.title,
        tourType: res.type.id,
        // vehicles: IVehicle[],
        dayDuration: res.dayDuration,
        nightDuration: res.nightDuration,
        tourMediaIds: res.mediaIds,
        mainImageId: res.mainMediaId,
        price: {
          currencyPrice: res.prices.currencyPrice,
          currencyPriceType: res.prices?.currencyPriceType?.id,
          price: res.prices.price,
          netPrice: res.prices.netPrice,
          disCountPrice: res.prices.disCountPrice
        },
        hotelRooms: res.hotelRooms,
        description: res.description
      };
      this.fromDate = moment(res.startDate, 'jYYYY/jMM/jDD  HH:mm');
      this.toDate = moment(res.endDate, 'jYYYY/jMM/jDD  HH:mm');
      this.fromLocation = res.fromLocation;
      this.toLocation = res.toLocation;
      this.images = res.mediaIds.map(id => ({
        mediaId: id,
        file: null,
        url: `http://beta-api.gozarino.com/v1/web/media/${id}`
      }));
      this.mainImageIndex = res.mediaIds.findIndex(id => id === this.tour.mainImageId);
      this.selectedHotel = res.hotel;
      this.selectedCategories = res.categories;
      this.srvData.thanksMainProgressBar();
    });

  }

  getCategories(event: any): void {
    this.srvData.showMainProgressBarForMe();
    this.srvSrch.getToueCategories(event.query).subscribe(res => {
      this.categories = res;
      this.srvData.thanksMainProgressBar();
    });
  }

  getHotels(event: any): void {
    this.srvData.showMainProgressBarForMe();
    this.srvSrch.getHotel(event.query).subscribe(res => {
      this.hotels = res;
      this.srvData.thanksMainProgressBar();
    });
  }

  getRooms(event: any): void {
    this.srvData.showMainProgressBarForMe();
    this.srvSrch.getHotelRooms(null, event.query).subscribe(res => {
      this.rooms = res;
      this.srvData.thanksMainProgressBar();
    });
  }

  getTourType(): void {
    this.srvData.showMainProgressBarForMe();
    this.srvTour.getTourType().subscribe(res => {
      this.tourTypes = res.map(t => ({ label: t.title, value: t.id }));
      this.srvData.thanksMainProgressBar();
    });
  }

  getVehicles(): void {
    this.srvData.showMainProgressBarForMe();
    this.srvVehicle.getVehicles().subscribe(res => {
      this.vehicels = res;
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

  getCurrency(): void {
    this.srvData.showMainProgressBarForMe();
    this.srvCurrency.get().subscribe(res => {
      this.currencies = res.map(t => ({ label: t.title, value: t.typeId }));
      this.srvData.thanksMainProgressBar();
    });
  }

  defaultImg(row: any): void {
    row.url = 'assets/no-image.png';
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
    if (this.tour.title && this.tour?.tourType > -1 && this.fromLocation &&
      this.toLocation && this.tour.dayDuration && this.tour.nightDuration &&
      this.fromDate && this.toDate && this.selectedCategories?.length > 0 &&
      this.selectedHotel && this.selectedRoom?.length > 0 && this.tour.price.price) {

      this.saving = true;
      this.tour.fromLocationId = this.fromLocation.locationId;
      this.tour.toLocationId = this.toLocation.locationId;
      const startDate: Date = this.fromDate?._d;
      const utcFromDate = new Date(startDate.toUTCString());
      this.tour.startDate = utcFromDate.toISOString();
      const endDate: Date = this.toDate?._d;
      const utcendDate = new Date(endDate.toUTCString());
      this.tour.endDate = utcendDate.toISOString();
      this.goVehicels?.forEach(vehicle => {
        this.tour.vehicles.push({ type: 0, vehicleId: vehicle.vehicleId });
      });
      this.backVehicels?.forEach(vehicle => {
        this.tour.vehicles.push({ type: 1, vehicleId: vehicle.vehicleId });
      });
      this.tour.hotelId = this.selectedHotel.id;
      this.tour.hotelRooms = this.selectedRoom.map(r => r.kindId);
      this.tour.tourCategories = this.selectedCategories.map(c => c.id);

      await this.saveImages();
      if (this.tourId > 0) {
        this.tour.tourId = this.tourId;
        this.srvTour.editTour(this.tour).subscribe(res => {
          this.srvMsg.add({ severity: 'success', summary: 'ویرایش اطلاعات', detail: 'ویرایش اطلاعات با موفقیت انجام شد .' });
          this.saving = false;
          this.router.navigate(['./panel/tour/tours']);
        }, _ => {
          this.saving = false;
        });
      } else {
        this.srvTour.addTour(this.tour).subscribe(res => {
          this.srvMsg.add({ severity: 'success', summary: 'ثبت اطلاعات', detail: 'ثبت اطلاعات با موفقیت انجام شد .' });
          this.saving = false;
          this.router.navigate(['./panel/tour/tours']);
        }, _ => {
          this.saving = false;
        });
      }
    }

    this.submitted = true;
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
