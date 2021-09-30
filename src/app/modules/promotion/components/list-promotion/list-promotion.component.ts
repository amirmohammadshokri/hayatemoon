import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IState } from 'src/app/interfaces';
import { IPromotion } from 'src/app/interfaces/promotion.interface';
import { DataService, PromotionService } from 'src/app/services';

@Component({
  selector: 'ss-list-promotion',
  templateUrl: './list-promotion.component.html',
  styleUrls: ['./list-promotion.component.scss']
})
export class ListPromotionComponent implements OnInit {

  cols: any[];
  promotions: IPromotion[] = [];
  loading: boolean;
  currentPage: number;
  items: IState[];
  item: any;
  title: string;
  showStateDialog: boolean;
  selectedPromotion: any;
  nothingElse: boolean;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (max === Math.round(pos) && !this.nothingElse) {
      this.currentPage++;
      this.getPromotions(false);
    }
  }

  constructor(
    private confirmationService: ConfirmationService,
    private srvRes: PromotionService,
    private srvMsg: MessageService,
    private router: Router,
    private srvData: DataService
  ) 
   {
    this.items = [
      {
        code: 0,
        name: 'فعال'
      },
      {
        code: 3,
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
      { field: 'title', header: 'عنوان پروموشن' },
      { field: 'price', header: 'قیمت' },
      { field: 'state', header: 'وضعیت' }
    ];
    this.getPromotions(true);
  }
 
  getPromotions(firstLoad: boolean): void {
    if (firstLoad) {
      this.currentPage = 1;
      this.promotions = [];
    }
    this.loading = true;
    let filter = ``;
    if (this.item) {
      filter += `&state=${this.item.code}`;
    }
    if (this.title) {
      filter += `&title=${this.title}`;
    }
    this.srvRes.getpromotions(filter, this.currentPage).subscribe(res => {
      if (res.length === 0) {
        this.nothingElse = true;
      }
      this.promotions.push(...res);
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
        this.deletePromotion(id);
      }
    });
  }

  deletePromotion(id: number): void {
    this.srvRes.deletepromotion(id).subscribe(() => {
      this.currentPage = 1;
      this.getPromotions(true);
    });
  }

  editPromotion(id: number): void {
    this.router.navigate([`../panel/promotion/form-promotion/${id}`]);
  }

}
