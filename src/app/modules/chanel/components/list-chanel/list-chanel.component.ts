import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IChanelList } from 'src/app/interfaces';
import { ChanelService } from 'src/app/services';

@Component({
  selector: 'ss-list-chanel',
  templateUrl: './list-chanel.component.html',
  styleUrls: ['./list-chanel.component.scss']
})
export class ListChanelComponent implements OnInit {

  chanels: IChanelList[] = [];
  cols: any[] = [];
  loading: boolean = false;
  nothingElse: any;
  currentPage: any;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (max === Math.round(pos) && !this.nothingElse) {
      this.currentPage++;
      this.getChanels(false);
    }
  }

  constructor(
    private confirmationService: ConfirmationService,
    private sevChnl: ChanelService,
    private srvMsg: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'title', header: 'عنوان' },
      { field: 'description', header: 'توضیحات' },
      { field: 'memberCount', header: 'تعداد اعضاء' }
    ];
    this.getChanels(true);
  }


  getChanels(firstLoad: boolean): void {
    if (firstLoad) {
      this.currentPage = 1;
      this.chanels = [];
    }
    this.loading = true;
    this.sevChnl.getChanels(this.currentPage, 15).subscribe(res => {
      if (res.length === 0) {
        this.nothingElse = true;
      }
      this.chanels.push(...res);
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
        this.deleteChanel(id);
      }
    });
  }

  deleteChanel(id: number): void {
    this.sevChnl.deleteChanel(id).subscribe(() => {
      this.getChanels(true);
    });
  }

  editChanel(id: number): void {
    this.router.navigate([`../panel/chanel/chanel/${id}`]);
  }

}
