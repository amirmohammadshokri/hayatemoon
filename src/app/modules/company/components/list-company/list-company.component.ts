import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ICompany } from 'src/app/interfaces/companys.interface';
import { CompanyService } from 'src/app/services';

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
  }


  getCompanys(firstLoad: boolean): void {
    if (firstLoad) {
      this.currentPage = 1;
      this.companys = [];
    }
    this.loading = true;
    this.sevCo.getCompanies(this.currentPage, 15).subscribe(res => {
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
      this.getCompanys(true);
    });
  }

  editCompany(id: number): void {
    this.router.navigate([`../panel/company/form-company/${id}`]);
  }

}
