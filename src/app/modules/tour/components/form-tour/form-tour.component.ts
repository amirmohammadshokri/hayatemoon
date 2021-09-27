import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { IAddTour } from 'src/app/interfaces';
import { CurrencyService, DataService, MediaService, SearchService, TourService, VehiclesService } from 'src/app/services';
import * as moment from 'jalali-moment';
import { forkJoin } from 'rxjs';
import { ViewChild } from '@angular/core';
import { DatePickerComponent } from 'ng2-jalali-date-picker/date-picker/date-picker.component';


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
  required: boolean = false;
  rooms: any[] = [];
  facilitiesKinds: any[] = [];
  images: { mediaId: number, file: File, url: string }[] = [];
  currencies: SelectItem[] = [];
  mainImageIndex: number = 0;
  tourId: number;
  routes: any[] = [{ name: 'داخلی', key: true }, { name: 'خارجی', key: false }];
  tourTypesId: number;
  @ViewChild('dateComponent') dateComponent: DatePickerComponent;


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
    this.getCurrency();
    this.route.params.subscribe(prms => {
      this.tourId = +prms.id
      if (this.tourId > 0) {
        this.getTour();
      }
    });
  }

  onRoomChange(e) {
    if (this.selectedRoom?.length > 1) {
      this.srvMsg.add({ severity: 'success', summary: 'توجه', detail: 'شما بیش از یک اتاق استفاده کردید' })
    }
  }

  getTour(): void {
    this.srvData.showMainProgressBarForMe();
    this.srvTour.getTour(this.tourId).subscribe(res => {
      this.tour = {
        isForeign: res.isForeign,
        isInstallments: res.isInstallments,
        title: res.title,
        tourType: res.type.id,
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
        description: res.description,
        vehicles: []
      };
      this.getVehicles();
      this.fromDate = moment(res.startDate, 'jYYYY/jMM/jDD  HH:mm');
      this.toDate = moment(res.endDate, 'jYYYY/jMM/jDD  HH:mm');
      this.fromLocation = res.fromLocation;
      this.toLocation = res.toLocation;
      this.images = res.mediaIds.map(id => ({
        mediaId: id,
        file: null,
        url: `https://api.gashtineh.com/v1/web/media/${id}`
      }));
      this.mainImageIndex = res.mediaIds.findIndex(id => id === this.tour.mainImageId);
      this.mainImageIndex = (this.mainImageIndex > -1 ? this.mainImageIndex : 0)
      this.selectedHotel = res.hotel;
      this.getRooms()
      this.selectedCategories = res.categories;
      setTimeout(() => {
        this.goVehicels = res.vehicles?.find(v => v.type?.id == 0)?.vehicles;
        this.backVehicels = res.vehicles?.find(v => v.type?.id == 1)?.vehicles;
        this.selectedRoom = res.hotelRooms?.map(r => ({ hotelRoomId: r.id, title: r.title }));
        this.srvData.thanksMainProgressBar();
      }, 500);
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

  getRooms(): void {
    this.srvData.showMainProgressBarForMe();
    this.srvSrch.getHotelRooms(this.selectedHotel.id, '').subscribe(res => {
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
      // 3 id is all of cars so show all cars and dont filter
      this.vehicels = (this.tour.tourType == 3 ? res : res.filter(i => i.tourType.id === this.tour.tourType));
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

  submit(): void {
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
      this.tour.hotelRooms = this.selectedRoom.map(r => r.hotelRoomId);
      this.tour.tourCategories = this.selectedCategories.map(c => c.id);

      this.saveImages().then(() => {
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
      });
    }

    this.submitted = true;
  }

  saveImages(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (this.images.length === 0) {
        resolve();
      } else {
        const calls = [];
        // just save new images else return
        const newImages = this.images.filter(im => !im.mediaId);
        if (newImages.length == 0) {
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
            this.tour.tourMediaIds.push(res[index][key]);
          }
          // after all image contain mediaId set main media Id
          this.tour.mainImageId = this.images[this.mainImageIndex][key];

          resolve();
        }, () => {
          this.saving = false;
          reject();
        });
      }
    });
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
    this.tour.tourMediaIds = this.tour.tourMediaIds.filter(m => m !== img.mediaId);
    if (this.tour.mainImageId === img.mediaId) {
      this.tour.mainImageId = 0;
    }
  }

}
