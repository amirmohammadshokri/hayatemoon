import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'jalali-moment';
import { MessageService, SelectItem } from 'primeng/api';
import { IAddAdvertising } from 'src/app/interfaces/add-advertising.interface';
import { SearchService, DataService, MediaService } from 'src/app/services';
import { AdvertisingService } from 'src/app/services/advertising.service';

@Component({
  selector: 'ss-form-advertising',
  templateUrl: './form-advertising.component.html',
  styleUrls: ['./form-advertising.component.scss']
})
export class FormAdvertisingComponent implements OnInit {
  advertising: IAddAdvertising = { state: 0 };
  locations: any[] = [];
  selectedLocation: any;
  pageTypes: SelectItem[] = [];
  positionTypes: SelectItem[] = [];
  startDate: any;
  endDate: any;
  states: SelectItem[];
  image: { mediaId: number, file: File, url: string };
  mainImageIndex: number;
  saving: boolean;
  submitted: boolean =false;
  adsId: number;

  constructor(
    private srvAds: AdvertisingService,
    private srvData: DataService,
    private srvSrch: SearchService,
    private aRoute: ActivatedRoute,
    private router: Router,
    private srvMsg: MessageService,
    private srvMedia: MediaService) { }

  ngOnInit(): void {
    this.aRoute.params.subscribe(prms => {
      if (prms.id > 0) {
        this.adsId = Number.parseInt(prms.id, 0);
        this.getAdverticment();
      }
    });
    this.states = [
      { value: 0, label: 'فعال' },
      { value: 3, label: 'غیر فعال' },
      { value: 2, label: 'در حالت انتظار' }
    ]
    this.getPageType();
    this.getPositionType();
  }

  getAdverticment() {
    this.srvData.showMainProgressBarForMe();
    this.srvAds.getAdvertisingById(this.adsId).subscribe(ads => {
      this.image = {
        mediaId: ads.mediaId,
        file: null,
        url: `http://beta-api.gozarino.com/v1/web/media/${ads.mediaId}`
      }
      this.selectedLocation = ads.destLocation;
      this.startDate = moment(ads.startDate, 'jYYYY/jMM/jDD');
      this.endDate = moment(ads.endDate, 'jYYYY/jMM/jDD');
      this.advertising = {
        description: ads.description,
        link: ads.link,
        mediaId: ads.mediaId,
        positionType: ads.positionType.id,
        state: ads.state.id,
        pageType: ads.pageType
      }
      this.srvData.thanksMainProgressBar();
    })
  }

  getLocations(event: any): void {
    this.srvData.showMainProgressBarForMe();
    this.srvSrch.getLocation(event.query).subscribe(res => {
      this.locations = res;
      this.srvData.thanksMainProgressBar();
    });
  }

  getPageType(): void {
    this.srvAds.getPageType().subscribe(res => {
      this.pageTypes = res.map(t => ({ label: t.title, value: t.id }));
    });
  }

  getPositionType(): void {
    this.srvAds.getPositionType().subscribe(res => {
      this.positionTypes = res.map(t => ({ label: t.title, value: t.id }));
    });
  }

  addImage(e: any): void {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.image = { mediaId: null, url: event.target.result, file: e.target.files[0] };
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  deleteImage(): void {
    this.image = null;
    this.advertising.mediaId = this.advertising.mediaId;
  }

  defaultImg(row: any): void {
    row.url = 'assets/no-image.png';
  }

  submit() {
    if (this.startDate) {
      this.saving = true;
      const startDate: Date = this.startDate?._d;
      const utcstartDate = new Date(startDate.toUTCString());
      this.advertising.startDate = utcstartDate.toISOString();

      if (this.endDate) {
        const endDate: Date = this.endDate?._d;
        const utcendDate = new Date(endDate.toUTCString());
        this.advertising.endDate = utcendDate.toISOString();
      }

      this.advertising.destLocationId = this.selectedLocation?.locationId;

      this.saveImages().then(() => {
        if (this.adsId > 0) {
          this.srvAds.editAdvertising(this.adsId, this.advertising).subscribe(() => {
            this.srvMsg.add({ severity: 'success', summary: 'ویرایش تبلیغات', detail: 'عملیات با موفقیت انجام شد' });
            this.router.navigate(['./panel/advertising/advertisings']);
          }, _ => {
            this.saving = false;
          });
        } else {
          this.srvAds.addAdvertising(this.advertising).subscribe(() => {
            this.srvMsg.add({ severity: 'success', summary: 'ثبت تبلیغات ', detail: 'عملیات با موفقیت انجام شد' });
            this.router.navigate(['./panel/advertising/advertisings']);
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
      // if image not selected or is previous is saved return
      if (!this.image || this.image.mediaId) {
        this.srvMsg.add({ severity: 'warn', summary: 'ثبت تبلیغات ', detail: 'انتخاب تصویر الزامی است' });
        this.saving = false;
        reject();
      }
      const formData = new FormData();
      formData.append(`file`, this.image.file, this.image.file.name);
      this.srvMedia.upload(formData, 0).subscribe(res => {
        this.image.mediaId = res.mediaId;
        this.advertising.mediaId = res.mediaId;
        resolve();
      }, () => {
        this.saving = false;
        reject();
      });
    });
  }

}
