import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ICompanySearch } from 'src/app/interfaces/companySearch.interface';
import { IUsers } from 'src/app/interfaces/users.interface';
import { CompanyService, MyRoleService, SearchService } from 'src/app/services';

@Component({
  selector: 'ss-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  cols: any[];
  users: IUsers[] = [];
  loading: boolean;
  currentPage: number;
  item: any;
  showStateDialog: boolean;
  nothingElse: boolean;
  companies: ICompanySearch[] = [];
  selecteCompanies: ICompanySearch;
  isSuperAdmin: boolean;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (max === Math.round(pos) && !this.nothingElse) {
      this.currentPage++;
      this.getUsers(false);
    }
  }

  constructor(
    private confirmationService: ConfirmationService,
    private srvCo: CompanyService,
    private srvRole: MyRoleService,
    private srcSrch: SearchService,
    private srvMsg: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.srvRole.getUserInfo().subscribe(userInfo => {
      if (userInfo.role == 'SUPERADMIN') {
        this.isSuperAdmin = true;
      }
      this.srvCo.getCompany(userInfo.CompanyId).subscribe(co => {
        this.selecteCompanies = co;
        this.getUsers(true);
      })
    });

    this.cols = [
      { field: 'userName', header: 'نام کاربری' },
      { field: 'firstName', header: 'نام' },
      { field: 'lastName', header: 'نام خانوادگی' },
      { field: 'internalPhone', header: ' تلفن داخلی ' },
      { field: 'email', header: 'ایمیل' }
    ];
  }

  getCompany(event: any): void {
    this.srcSrch.getCompanySaerch(event.query).subscribe(res => {
      this.companies = res;
    });
  }

  getUsers(firstLoad: boolean): void {
    if (firstLoad) {
      this.currentPage = 1;
      this.users = [];
    }
    this.loading = true;
    this.srvCo.getUsers(this.selecteCompanies.companyId, this.currentPage, 15).subscribe(res => {
      if (res.length === 0) {
        this.nothingElse = true;
      }

      this.users.push(...res);
      this.loading = false;
    });
  }

  confirmDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف این ردیف اطمینان دارید؟',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'بله',
      rejectLabel: 'نه',
      accept: () => {
        this.deleteUsers(id);
      }
    });
  }

  deleteUsers(id: number): void {
    this.srvCo.deleteUser(id).subscribe(() => {
      this.srvMsg.add({ severity: 'success', summary: 'حذف کاربر', detail: 'عملیات با موفقیت انجام شد' })
      this.getUsers(true);
    });
  }

  editCompany(id: number): void {
    this.router.navigate([`../panel/company/form-user/${id}`]);
  }
}