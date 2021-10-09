import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ICompany } from 'src/app/interfaces/companys.interface';
import { ICompanySearch } from 'src/app/interfaces/companySearch.interface';
import { CompanyService, MyRoleService, SearchService } from 'src/app/services';

@Component({
  selector: 'ss-list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.scss']
})
export class ListCompanyComponent implements OnInit {

  cols: any[];
  companys: ICompany[] = [];
  loading: boolean;
  currentPage: number;
  selectedHotel: ICompany;
  item: any;
  title: string;
  showStateDialog: boolean;
  nothingElse: boolean;
  editAccess: boolean;
  isSuperAdmin: boolean;
  companies: ICompanySearch[] = [];
  selecteCompany: ICompanySearch;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (max === Math.round(pos) && !this.nothingElse) {
      this.currentPage++;
      this.getCompanys(false);
    }
  }

  constructor(
    private confirmationService: ConfirmationService,
    private sevCo: CompanyService,
    private srvMsg: MessageService,
    private srvRole: MyRoleService,
    private srcSrch: SearchService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.cols = [
      { field: 'title', header: 'عنوان شرکت' },
      { field: 'fullname', header: 'ایجاد کننده' },
      { field: 'companyTitle', header: 'نام شرکت' },
      { field: 'ceoFirstName', header: ' مدیرعامل نام ' },
      { field: 'ceoLastName', header: 'نام خانوادگی مدیرعامل' },
      { field: 'saveDate', header: 'تاریخ ذخیره' }
    ];

    this.getCompanys(true);

    this.srvRole.getUserInfo().subscribe(user => {
      this.editAccess = (user.Permissions as string[]).indexOf('EditCompanyProfile') > -1;
      if (user.role == 'SUPERADMIN') {
        this.isSuperAdmin = true;
      }
    })
  }

  getCompanyBySearch(event: any): void {
    this.srcSrch.getCompanySaerch(event.query).subscribe(res => {
      this.companies = res;
    });
  }

  getCompanys(firstLoad: boolean): void {
    if (firstLoad) {
      this.currentPage = 1;
      this.companys = [];
    }
    this.loading = true;
    this.sevCo.getCompanies(this.selecteCompany?.companyId, this.currentPage, 15).subscribe(res => {
      if (res.length === 0) {
        this.nothingElse = true;
      }
      this.companys.push(...res);
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
        this.deleteCompany(id);
      }
    });
  }

  deleteCompany(id: number): void {
    this.sevCo.deleteCompany(id).subscribe(() => {
      this.srvMsg.add({ severity: 'success', summary: 'حذف شرکت', detail: 'حذف با موفقیت انجام شد' })
      this.getCompanys(true);
    });
  }

  editCompany(id: number): void {
    this.router.navigate([`../panel/company/form-company/${id}`]);
  }

}
