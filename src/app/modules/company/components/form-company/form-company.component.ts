import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'jalali-moment';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { IAddCompany } from 'src/app/interfaces';
import { ICompanyType } from 'src/app/interfaces/companyType.interface';
import { ILocation } from 'src/app/interfaces/location.interface';
import { CompanyService, SearchService } from 'src/app/services';
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

  companyAdd:IAddCompany={contacts:[],certificatesMediaIds:[]};
  companyId: number;
  ceoBirthDate: any;
  state1:State[];
  companyType: SelectItem[] = [];
  locations: any[] = [];
  selectedLocation: ILocation;
  contacts: any[];
  contact: any = {};
  saving: boolean;
  submitted: boolean;

  constructor(
     
    private srvCo: CompanyService,
    private srcSrch:SearchService,
    // private srvMsg: MessageService,
    private router: Router,
    private aRoute: ActivatedRoute,
    
    // private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
  
    this.getCompanyType();
    this.state1=[
      {id:0,value:'فعال'},
      {id:1,value:'غیر فعال'}
    ]
    
    this.aRoute.params.subscribe(prms => {
      console.log("Hello world",prms);
      if (prms.id > 0) {
        console.log("Hello world");
        
        this.companyId = Number.parseInt(prms.id, 0);
        this.getCompanyById(this.companyId);
      }
      else{
   
      }
    });
  }

  submit(): void {
      this.saving = true;
    if (this.companyAdd.id> 0) {
      const obj: IAddCompany = {
        id: this.companyAdd.id,
        title:this.companyAdd.title,
        type:1,
        ceoFirstName:this.companyAdd.ceoFirstName,
        ceoLastName:this.companyAdd.ceoLastName,
        ceoNationalCode:this.companyAdd.ceoNationalCode,
        ceoBirthDate:'2020/03/03',
        companyNationalCode:this.companyAdd.companyNationalCode,
        economyCode:this.companyAdd.economyCode,
        address:this.companyAdd.address,
        locationId:this.selectedLocation?.locationId,
        state:this.companyAdd.state,
        contacts:null
      };
      this.srvCo.editCompany(this.companyId,obj).subscribe(() => {
        // this.srvMsg.add({ severity: 'success', summary: 'ویرایش امکانات اتاق', detail: 'عملیات با موفقیت انجام شد' });
        this.companyAdd = {};
        this.router.navigate(['./panel/company/company-list']);
      });
    }
    else {
      this.companyAdd.id = 0;
      const obj1: IAddCompany = {
        id: 0,
        title:this.companyAdd.title,
        type:1,
        ceoFirstName:this.companyAdd.ceoFirstName,
        ceoLastName:this.companyAdd.ceoLastName,
        ceoNationalCode:this.companyAdd.ceoNationalCode,
        ceoBirthDate:'2020/03/03',
        companyNationalCode:this.companyAdd.companyNationalCode,
        economyCode:this.companyAdd.economyCode,
        address:this.companyAdd.address,
        locationId:this.companyAdd.locationId,
        state:this.companyAdd.state,
        contacts:null
      };
      this.srvCo.addCompany(obj1).subscribe(() => {
        // this.srvMsg.add({ severity: 'success', summary: 'ثبت امکانات اتاق ', detail: 'عملیات با موفقیت انجام شد' });
        this.router.navigate(['./panel/hotel/room-facilitieskinds']);
      });
    }
    
 
  this.submitted=true;
  }

  getCompanyById(id:number): void {
    this.srvCo.getCompany(id).subscribe(res => {
      this.ceoBirthDate = moment(res.ceoBirthDate, 'jYYYY/jMM/jDD');
      this.companyAdd = res;
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

 

}
