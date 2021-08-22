import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { IAddAdvertising } from 'src/app/interfaces/add-advertising.interface';
import { SearchService,DataService, MediaService } from 'src/app/services';
import { AdvertisingService } from 'src/app/services/advertising.service';

@Component({
  selector: 'ss-form-advertising',
  templateUrl: './form-advertising.component.html',
  styleUrls: ['./form-advertising.component.scss']
})
export class FormAdvertisingComponent implements OnInit {
  advertising:IAddAdvertising={};
  locations: any[] = [];
  selectedLocation: any;
  pageTypes: SelectItem[] = [];
  positionTypes: SelectItem[] = [];
  startDate: any;
  endDate: any;
  states: SelectItem[];
  images: { mediaId: number, file: File, url: string }[] = [];
  mainImageIndex: number;
  saving: boolean;

  constructor(private srvAds:AdvertisingService,private srvData: DataService,private srvSrch:SearchService,private srvMedia: MediaService,) {}

  ngOnInit(): void {
    this.states = [
      { value: 0, label: 'فعال' },
      { value: 1, label: 'غیر فعال' },
      { value: 2, label: 'در حالت انتظار' }
    ]
   this.getPageType();
   this.getPositionType();
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

  saveImages(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (this.images.length === 0) {
        resolve();
      }
      const calls = [];
      for (const img of this.images.filter(im => !im.mediaId)) {
        const formData = new FormData();
        formData.append(`file`, img.file, img.file.name);
        calls.push(this.srvMedia.upload(formData, 0));
      }
      if (calls.length === 0) {
        resolve();
      }
      forkJoin(calls).subscribe(res => {
        const key = 'mediaId';
       
      
          this.images.filter(im => !im.mediaId)[0].mediaId = res[0][key];
          // this.advertising.mediaId.push(res[0][key]);
     
        resolve();
      }, () => {
        // this.saving = false;
        reject();
      });
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
    this.advertising.mediaId = this.advertising.mediaId;
     
  }
  
  defaultImg(row: any): void {
    row.url = 'assets/no-image.png';
  }

 
}
