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
  state1: SelectItem[];
  companyType: SelectItem[] = [];
  Companies: any[] = [];
  selecteCompanies: ICompanySearch;
  contacts: any[];
  contact: any = {};
  saving: boolean;
  submitted: boolean;

  constructor(

    private srvCo: CompanyService,
    private srcSrch: SearchService,
     private srvMsg: MessageService,
    private router: Router,
    private aRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.gender = [
      { value: 0, label: 'مرد' },
      { value: 1, label: 'زن' }
    ]
    this.state1 = [
      { value: 0, label: 'فعال' },
      { value: 1, label: 'غیر فعال' }
    ]
  }

  getCompany(event: any): void {
    this.srcSrch.getCompanySaerch(event.query).subscribe(res => {
      this.Companies = res;
    });
  }

  submit(): void {
  }

}
