import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'jalali-moment';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { IAddCompany } from 'src/app/interfaces';
import { ICompanyType } from 'src/app/interfaces/companyType.interface';
import { ILocation } from 'src/app/interfaces/location.interface';
import { CompanyService, MediaService, SearchService } from 'src/app/services';
interface State {
  id: number,
  value: string
}

@Component({
  selector: 'ss-form-company',
  templateUrl: './form-company.component.html',
  styleUrls: ['./form-company.component.scss']
})
export class FormCompanyComponent implements OnInit {

  companyAdd: IAddCompany = { contacts: [], certificatesMediaIds: [] };
  companyId: number;
  ceoBirthDate: any;
  state1: SelectItem[];
  companyType: SelectItem[] = [];
  locations: any[] = [];
  selectedLocation: ILocation;
  contacts: any[];
  contact: any = {};
  saving: boolean;
  submitted: boolean;

  images: { mediaId: number, file: File, url: string }[] = [];
  mainImageIndex: number;

  constructor(

    private srvCo: CompanyService,
    private srcSrch: SearchService,
    private srvMedia: MediaService,
     private srvMsg: MessageService,
    private router: Router,
    private aRoute: ActivatedRoute,

    // private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {

    this.getCompanyType();
    this.state1 = [
      { value: 0, label: 'فعال' },
      { value: 1, label: 'غیر فعال' }
    ]

    this.aRoute.params.subscribe(prms => {
      if (prms.id > 0) {
        this.companyId = Number.parseInt(prms.id, 0);
        this.getCompanyById(this.companyId);
      }
      else {

      }
    });
  }

  submit(): void {
    this.saving = true;
    if (this.companyAdd.id > 0) {
      const obj: IAddCompany = {
        id: this.companyAdd.id,
        title: this.companyAdd.title,
        type: this.companyAdd.type,
        ceoFirstName: this.companyAdd.ceoFirstName,
        ceoLastName: this.companyAdd.ceoLastName,
        ceoNationalCode: this.companyAdd.ceoNationalCode,
        ceoBirthDate:  this.companyAdd.ceoBirthDate,
        companyNationalCode: this.companyAdd.companyNationalCode,
        economyCode: this.companyAdd.economyCode,
        address: this.companyAdd.address,
        locationId: this.selectedLocation?.locationId,
        state: this.companyAdd.state
      };

      this.saveImages().then(() => {
        if (this.companyAdd.id) {
          this.srvCo.editCompany(this.companyId, obj).subscribe(() => {
            this.srvMsg.add({ severity: 'success', summary: 'ویرایش شرکت', detail: 'عملیات با موفقیت انجام شد' });
            this.companyAdd = {};
            this.router.navigate(['./panel/company/company-list']);
          }, _ => {
            this.saving = false;
          });
        }  
      });
 
    }
    else {
      this.companyAdd.id = 0;
      const obj1: IAddCompany = {
        id: 0,
        title: this.companyAdd.title,
        type: this.companyAdd.type,
        ceoFirstName: this.companyAdd.ceoFirstName,
        ceoLastName: this.companyAdd.ceoLastName,
        ceoNationalCode: this.companyAdd.ceoNationalCode,
        ceoBirthDate:  this.ceoBirthDate,
        companyNationalCode: this.companyAdd.companyNationalCode,
        economyCode: this.companyAdd.economyCode,
        address: this.companyAdd.address,
        locationId: this.selectedLocation?.locationId,
        state: this.companyAdd.state
      };
    
      this.saveImages().then(() => {
        
        this.srvCo.addCompany(obj1).subscribe(() => {
          this.srvMsg.add({ severity: 'success', summary: 'ثبت شرکت ', detail: 'عملیات با موفقیت انجام شد' });
         this.router.navigate(['./panel/company/company']);
       });
          }, _ => {
            this.saving = false;
          });
          
      }
     
  }

  getCompanyById(id: number): void {
    this.srvCo.getCompany(id).subscribe(res => {
      this.ceoBirthDate = moment(res.ceoBirthDate, 'jYYYY/jMM/jDD');
      this.companyAdd = res;
      this.selectedLocation = res.location;
      this.images = this.companyAdd.certificatesMediaIds.map(mid => ({
        mediaId: mid,
        file: null,
        url: `http://beta-api.gozarino.com/v1/web/media/${id}`
      }));
      // this.mainImageIndex = this.companyAdd.certificatesMediaIds.findIndex(mid => mid === this.companyAdd.certificatesMediaIds);
    });
  
  }

  getCompanyType(): void {
    this.srvCo.getCompanyTypes().subscribe(res => {
      this.companyType = res.map(t => ({ label: t.title, value: t.id }));
    });
  }

  getLocations(event: any): void {
    this.srcSrch.getLocation(event.query).subscribe(res => {
      this.locations = res;
    });
  }

  addContact(): void {
    this.companyAdd.contacts.push(
      {
        value:this.contact.value,
        title:this.contact.title
      }
    );
    this.contact = {};
  }
  
  deleteContact(index: number): void {
    this.companyAdd.contacts.splice(index, 1);
  }


  defaultImg(row: any): void {
    row.url = 'assets/no-image.png';
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
      forkJoin(calls).subscribe(res => {
        const key = 'mediaId';
        
        for (let index = 0; index < res.length; index++) {
          this.images.filter(im => !im.mediaId)[index].mediaId = res[index][key];
          this.companyAdd.certificatesMediaIds.push(res[index][key]);
        }
        resolve();
      }, () => {
        this.saving = false;
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
    this.companyAdd.certificatesMediaIds = this.companyAdd.certificatesMediaIds.filter(m => m !== img.mediaId);
    if (this.companyAdd.certificatesMediaIds === img.mediaId) {
      this.companyAdd.certificatesMediaIds = [];
    }
  }

}
