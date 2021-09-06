import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'jalali-moment';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { IAddCompany } from 'src/app/interfaces';
import { ICompanyType } from 'src/app/interfaces/companyType.interface';
import { ILocation } from 'src/app/interfaces/location.interface';
import { CompanyService, MediaService, SearchService } from 'src/app/services';
import { MyRoleService } from '../../../../services/my-role.service'


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
  states: SelectItem[];
  companyType: SelectItem[] = [];
  locations: any[] = [];
  selectedLocation: ILocation;
  contacts: any[];
  contact: any = {};
  saving: boolean;
  submitted: boolean;
  superAdminAlowed: boolean

  images: { mediaId: number, file: File, url: string }[] = [];
  mainImageIndex: number;

  constructor(
    private srvCo: CompanyService,
    private srcSrch: SearchService,
    private srvMedia: MediaService,
    private srvMsg: MessageService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private myRoleService: MyRoleService) { }

  ngOnInit(): void {
    this.myRoleService.checkPermissionMyRole("user").subscribe(res => {
      this.superAdminAlowed = res
    })
    this.getCompanyType();
    this.states = [
      { value: 0, label: 'فعال' },
      { value: 1, label: 'غیر فعال' }
    ]

    this.aRoute.params.subscribe(prms => {
      if (prms.id > 0) {
        this.companyId = Number.parseInt(prms.id, 0);
        this.getCompanyById(this.companyId);
      }
    });
  }

  submit(): void {
    this.saving = true;
    const ceoBirthDate: Date = this.ceoBirthDate?._d;
    const utcCeoBirthDate = new Date(ceoBirthDate.toUTCString());
    this.companyAdd.ceoBirthDate = utcCeoBirthDate.toISOString();
    this.companyAdd.locationId = this.selectedLocation?.locationId;
    if(this.contact.value !="" && this.contact.value!=null ){
     this.contact.value=this.contact.value.replace('-',''); 
    }
    
    this.saveImages().then(() => {
      if (this.companyId > 0) {
        this.srvCo.editCompany(this.companyId, { id: this.companyId, company: this.companyAdd }).subscribe(() => {
          this.srvMsg.add({ severity: 'success', summary: 'ویرایش شرکت', detail: 'عملیات با موفقیت انجام شد' });
          this.router.navigate(['./panel/company/companys']);
        }, _ => {
          this.saving = false;
        });
      } else {
        this.srvCo.addCompany({ company: this.companyAdd }).subscribe(() => {
          this.srvMsg.add({ severity: 'success', summary: 'ثبت شرکت ', detail: 'عملیات با موفقیت انجام شد' });
          this.router.navigate(['./panel/company/companys']);
        }, _ => {
          this.saving = false;
        });
      }
    });
  }

  getCompanyById(id: number): void {
    this.srvCo.getCompany(id).subscribe(res => {
      const date = new Date(res.ceoBirthDate).toLocaleDateString('fa-IR').replace(/([۰-۹])/g, token => String.fromCharCode(token.charCodeAt(0) - 1728));
      this.ceoBirthDate = moment(date, 'jYYYY/jMM/jDD');
      this.companyAdd = res;
      this.companyAdd.type = res.type.id;
      this.companyAdd.state = res.state.id;
      this.selectedLocation = res.location;
      this.images = this.companyAdd.certificatesMediaIds.map(mid => ({
        mediaId: mid,
        file: null,
        url: `http://beta-api.gozarino.com/v1/web/media/${mid}`
      }));
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
        value: this.contact.value,
        title: this.contact.title
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
      if (calls.length === 0) {
        resolve();
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
