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
  currentPage: number;
  residencefacilitieskind: IResidencefacilitieskind[] = [];

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (max - 5 <= Math.round(pos) && Math.round(pos) <= max + 5) {
      this.currentPage++;
      this.getResidencefacilitieskind();
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
    this.getResidencefacilitieskind();
  }

  getResidencefacilitieskind(): void {
    this.loading = true;
    this.srvResidence.getResidencefacilitieskind().subscribe(res => {
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
    this.srvResidence.deleteResidencefacilitieskind(id).subscribe(() => {
      this.getResidencefacilitieskind();
    });
  }

  editResidencefacilitieskind(id: number): void {
    console.log(id+'ssssssssssss');
     
    this.router.navigate([`../panel/residence/residence-facilitieskind-form/${id}`]);
  }

}
