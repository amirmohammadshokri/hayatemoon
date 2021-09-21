import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { IState, IUserInfo } from 'src/app/interfaces';
import { ICompanySearch } from 'src/app/interfaces/companySearch.interface';
import { DataService, IdentityService, MyRoleService, SearchService, TourService } from 'src/app/services';

@Component({
  selector: 'ss-list-tour',
  templateUrl: './list-tour.component.html',
  styleUrls: ['./list-tour.component.scss']
})
export class ListTourComponent implements OnInit {

  tours: any[];
  loading: boolean;
  cols: any[] = [];
  currentPage: number;
  items: IState[];
  item: any;
  title: string;
  nothingElse: boolean;
  CompanyId: number;
  submitted: boolean;
  companies: any[] = [];
  selecteCompanies: ICompanySearch;
  currentUser: IUserInfo = {};
  permissions: SelectItem[] = [];

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (max === Math.round(pos) && !this.nothingElse) {
      this.currentPage++;
      this.getToures(false);
    }
  }

  constructor(
    private confirmationService: ConfirmationService,
    private srvTour: TourService,
    private router: Router,
    private srvRole: MyRoleService,
    private srcSrch: SearchService,
    private srvMsg: MessageService,
    private srvData: DataService,
    private srvIdentity: IdentityService) { }

  ngOnInit(): void {
    this.srvRole.getUserInfo().subscribe(userInfo => {
      this.currentUser = userInfo;
      this.CompanyId = Number.parseInt(this.currentUser.CompanyId);
    });

    this.items = [
      { code: 0, name: 'فعال' },
      { code: 1, name: 'غیر فعال' },
      { code: 2, name: 'در انتظار' }
    ];
    this.cols = [
      { field: 'title', header: 'عنوان تور' },
      { field: 'fullname', header: 'ایجاد کننده' },
      { field: 'state', header: 'وضعیت' },
      { field: 'createdDate', header: 'تاریخ ایجاد' }
    ];
    this.getToures(true);
    this.getPermissions();
  }

  getPermissions(): void {
    this.srvIdentity.getPermissions().subscribe(res => {
      this.permissions = res.map(r => ({ label: r.title, value: r.id }));
    });
  }

  getCompany(event: any): void {
    this.srcSrch.getCompanySaerch(event.query).subscribe(res => {
      this.companies = res;
    });
  }


  getToures(firstLoad: boolean): void {
    if (firstLoad) {
      this.currentPage = 1;
      this.tours = [];
    }
    this.loading = true;
    let filter = ``;
    if (this.item) {
      filter += `&state=${this.item.code}`;
    }
    if (this.title) {
      filter += `&title=${this.title}`;
    }
    this.srvTour.getTours(filter, this.currentPage).subscribe(res => {
      if (res.length === 0) {
        this.nothingElse = true;
      }
      this.tours.push(...res);
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
        this.srvData.showMainProgressBarForMe()
        this.srvTour.deleteTour(id).subscribe(() => {
          this.srvData.thanksMainProgressBar()
          this.srvMsg.add({ severity: 'success', summary: 'حذف تور', detail: 'عملیات با موفقیت انجام شد' })
          this.getToures(true)
        })
      }
    });
  }

  editTour(id: number): void {
    this.router.navigate([`../panel/tour/tour-form/${id}`]);
  }

}
