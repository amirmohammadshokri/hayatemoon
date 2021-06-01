import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IResidence } from 'src/app/interfaces/residence.iterface';
import { IState } from 'src/app/interfaces/state.inteface';
import { DataService } from 'src/app/services';
import { ResidenceService } from 'src/app/services/residence.service';

@Component({
  selector: 'ss-list-residence',
  templateUrl: './list-residence.component.html',
  styleUrls: ['./list-residence.component.scss']
})
export class ListResidenceComponent implements OnInit {
  cols: any[];
  residences: IResidence[] = [];
  loading: boolean;
  currentPage: number;
  items: IState[];
  item: any;
  title: string;
  showStateDialog: boolean;
  selectedResidence: any;
  nothingElse: boolean;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (max === Math.round(pos) && !this.nothingElse) {
      this.currentPage++;
      this.getResidence(false);
    }
  }

  constructor(
    private confirmationService: ConfirmationService,
    private srvRes: ResidenceService,
    private srvMsg: MessageService,
    private router: Router,
    private srvData: DataService
  ) {
    this.items = [
      {
        code: 0,
        name: 'فعال'
      },
      {
        code: 1,
        name: 'غیر فعال'
      },
      {
        code: 2,
        name: 'در انتظار'
      }
    ];
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'title', header: 'عنوان اقامتگاه' },
      { field: 'fullname', header: 'ایجاد کننده' },
      { field: 'state', header: 'وضعیت' },
      { field: 'createdDate', header: 'تاریخ ایجاد' }
    ];
    this.getResidence(true);
  }

  changeState(stateId: number): void {
    this.srvData.showMainProgressBarForMe();
    this.showStateDialog = false;
    this.srvRes.changeState({
      id: this.selectedResidence.id,
      state: stateId
    }).subscribe(res => {
      this.srvMsg.add({ severity: 'success', summary: 'تغییر وضعیت', detail: 'عملیات با موفقیت انجام شد' });
      this.srvData.thanksMainProgressBar();
      this.selectedResidence.state = { id: stateId, title: this.items.find(i => i.code === stateId).name };
    });
  }

  getResidence(firstLoad: boolean): void {
    if (firstLoad) {
      this.currentPage = 1;
      this.residences = [];
    }
    this.loading = true;
    let filter = ``;
    if (this.item) {
      filter += `&state=${this.item.code}`;
    }
    if (this.title) {
      filter += `&title=${this.title}`;
    }
    this.srvRes.getResidences(filter, this.currentPage).subscribe(res => {
      if (res.length === 0) {
        this.nothingElse = true;
      }
      this.residences.push(...res);
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
        this.deleteResidence(id);
      }
    });
  }

  deleteResidence(id: number): void {
    this.srvRes.deleteResidence(id).subscribe(() => {
      this.currentPage = 1;
      this.getResidence(true);
    });
  }

  editResidence(id: number): void {
    this.router.navigate([`../panel/residence/residence-form/${id}`]);
  }

}
