import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { IResidencefacilitieskind } from 'src/app/interfaces/residencefacilitieskind.interface';
import { ResidenceService } from 'src/app/services/residence.service';

@Component({
  selector: 'ss-list-residencefacilitieskind',
  templateUrl: './list-residencefacilitieskind.component.html',
  styleUrls: ['./list-residencefacilitieskind.component.scss']
})
export class ListResidencefacilitieskindComponent implements OnInit {

  cols: any[];
  loading: boolean;
  deleting: boolean;
  currentPage: number;
  residencefacilitieskind: IResidencefacilitieskind[] = [];
  nothingElse: boolean;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (max === Math.round(pos) && !this.nothingElse) {
      this.currentPage++;
      this.getResidencefacilitieskind(false);
    }
  }

  constructor(
    private srvResidence: ResidenceService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'title', header: 'عنوان' },
      { field: 'fontIconId', header: 'آیکن' },
      { field: 'createdDate', header: 'تاریخ ایجاد' }
    ];
    this.getResidencefacilitieskind(true);
  }

  getResidencefacilitieskind(firstLoad: boolean): void {
    if (firstLoad) {
      this.currentPage = 1;
      this.residencefacilitieskind = [];
    }
    this.loading = true;
    this.srvResidence.getResidencefacilitieskind(this.currentPage).subscribe(res => {
      if (res.length === 0) {
        this.nothingElse = true;
      }
      this.residencefacilitieskind.push(...res);
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
        this.deleteResidencefacilitieskind(id);
      }
    });
  }

  deleteResidencefacilitieskind(id: number): void {
    this.deleting = true;
    this.srvResidence.deleteResidencefacilitieskind(id).subscribe(() => {
      this.deleting = false;
      this.getResidencefacilitieskind(true);
    });
  }

  editResidencefacilitieskind(id: number): void {
    this.router.navigate([`../panel/residence/residence-facilitieskind-form/${id}`]);
  }

}
