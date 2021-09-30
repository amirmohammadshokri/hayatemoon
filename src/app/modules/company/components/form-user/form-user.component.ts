import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { IUserInfo } from 'src/app/interfaces';
import { IAddUsers } from 'src/app/interfaces/add-user.interface';
import { ICompanySearch } from 'src/app/interfaces/companySearch.interface';
import { CompanyService, IdentityService, MyRoleService, SearchService } from 'src/app/services';

@Component({
  selector: 'ss-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {

  currentUser: IUserInfo = {};
  userId: number;
  companyUser: IAddUsers = { routType: 0, state: 0 };
  genders: SelectItem[];
  states: SelectItem[];
  companies: any[] = [];
  selecteCompany: ICompanySearch;
  saving: boolean;
  submitted: boolean;
  permissions: SelectItem[] = [];
  roles: SelectItem[] = [];
  routes: any[] = [{ name: 'داخلی', key: 0 }, { name: 'خارجی', key: 1 }, { name: 'داخلی خارجی', key: 2 }];

  constructor(
    private srvCo: CompanyService,
    private srcSrch: SearchService,
    private srvMsg: MessageService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private srvIdentity: IdentityService,
    private srvRole: MyRoleService
  ) { }

  ngOnInit(): void {
    this.srvRole.getUserInfo().subscribe(userInfo => {
      this.currentUser = userInfo;
    });
    this.genders = [
      { value: 0, label: 'مرد' },
      { value: 1, label: 'زن' }
    ]
    this.states = [
      { value: 0, label: 'فعال' },
      { value: 1, label: 'غیر فعال' }
    ];
    this.aRoute.params.subscribe(prms => {
      this.getRoles();
      this.getPermissions();
      if (prms.id > 0) {
        this.userId = Number.parseInt(prms.id, 0);
        setTimeout(() => {
          this.getUserById();
        }, 500);
      }
    });
  }

  getCompany(event: any): void {
    this.srcSrch.getCompanySaerch(event.query).subscribe(res => {
      this.companies = res;
    });
  }

  getPermissions(): void {
    this.srvIdentity.getPermissions().subscribe(res => {
      this.permissions = res.map(r => ({ label: r.title, value: r.id }));
    });
  }

  getRoles(): void {
    this.srvIdentity.getRoles().subscribe(res => {
      this.roles = res.map(r => ({ label: r.title, value: r.id }));
    });
  }

  getUserById() {
    this.srvCo.getUser(this.userId).subscribe(res => {
      this.companyUser = res;
      this.selecteCompany = { companyId: res.regCompanyUser.companyId, title: res.regCompanyUser.companyTitle };
      this.companyUser.state = res.state.id;
      this.companyUser.routType = res.routType.id;
    });
  }

  submit(): void {
    if (this.companyUser.firstName && this.selecteCompany && this.companyUser.password) {
      this.saving = true;
      if (this.currentUser.role !== 'SUPERADMIN') {
        this.companyUser.companyId = Number.parseInt(this.currentUser.CompanyId);
      } else {
        this.companyUser.companyId = this.selecteCompany?.companyId;
      }
      if (this.companyUser.id > 0) {
        this.srvCo.edituser(this.userId, { id: this.userId, user: this.companyUser }).subscribe(res => {
          this.srvMsg.add({ severity: 'success', summary: 'ویرایش کاربر', detail: 'عملیات با موفقیت انجام شد' });
          this.router.navigate(['./panel/company/users']);
        }, () => {
          this.saving = false;
        });
      } else {
        this.srvCo.addUser({ user: this.companyUser }).subscribe(res => {
          this.srvMsg.add({ severity: 'success', summary: 'ثبت کاربر', detail: 'عملیات با موفقیت انجام شد' });
          this.router.navigate(['./panel/company/users']);
        }, () => {
          this.saving = false;
        });
      }
    }
    this.submitted = true;
  }

}