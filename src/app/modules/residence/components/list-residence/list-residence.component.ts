import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { IResidence } from 'src/app/interfaces/residence.iterface';
import { IState } from 'src/app/interfaces/state.inteface';
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
  sss: string;

  // hotelTypes: SelectItem[] = [];

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (max - 5 <= Math.round(pos) && Math.round(pos) <= max + 5) {
      this.currentPage++;
    }
  }

  constructor(
    private confirmationService: ConfirmationService,
    private sResidence: ResidenceService,
    private sMsg: MessageService,
    private router: Router
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
    this.getResidence();
  }

  getResidence(): void {
    this.loading = true;
    let filter = `?`;
    if (this.item) {
      filter += `&state=${this.item.code}`;
    }
    if (this.title) {
      filter += `&title=${this.title}`;
    }
    this.residences = [];
    this.sResidence.getResidences(filter, this.currentPage).subscribe(res => {
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
    this.sResidence.deleteResidence(id).subscribe(() => {
      this.currentPage = 1;
      this.getResidence();
    });
  }

  editResidence(id: number): void {
    this.router.navigate([`../panel/residence/residence-form/${id}`]);
  }

}
