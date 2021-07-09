import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { IAddCompany } from 'src/app/interfaces';
import { IAddUsers } from 'src/app/interfaces/add-user.interface';
import { ICompanySearch } from 'src/app/interfaces/companySearch.interface';
import { CompanyService, SearchService } from 'src/app/services';

@Component({
  selector: 'ss-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {

  userId: number;
  companyUser:IAddUsers={};
  gender: SelectItem[];
  states: SelectItem[];
  companyType: SelectItem[] = [];
  Companies: any[] = [];
  selecteCompanies: ICompanySearch;
  contacts: any[];
  contact: any = {};
  saving: boolean;
  submitted: boolean;
  selectedCategory: any = null;

  categories: any[] = [{name: 'داخلی', key: 0}, {name: 'خارجی', key: 1}, {name: 'داخلی خارحی', key: 1}];
  
  constructor(

    private srvCo: CompanyService,
    private srcSrch: SearchService,
     private srvMsg: MessageService,
    private router: Router,
    private aRoute: ActivatedRoute,
    
  ) {}

  ngOnInit(): void {

    this.gender = [
      { value: 0, label: 'مرد' },
      { value: 1, label: 'زن' }
    ]
    this.states = [
      { value: 0, label: 'فعال' },
      { value: 1, label: 'غیر فعال' }
    ]
    this.selectedCategory = this.categories[1];

    
  }

  getCompany(event: any): void {
    this.srcSrch.getCompanySaerch(event.query).subscribe(res => {
      this.Companies = res;
    });
  }

  submit(): void {
   
    this.saving = true;
    if (this.userId > 0) {
      const obj: IAddUsers = {
        companyId: this.companyUser.companyId,
        firstName:this.companyUser.firstName,
        lastName:this.companyUser.lastName,
        password:this.companyUser.password,
        mobile:this.companyUser.mobile,
        internalPhone:this.companyUser.internalPhone,
        email:this.companyUser.email,
        //gender:this.gender,
        routType: this.selectedCategory
      };
 
    }
     
  }

}
