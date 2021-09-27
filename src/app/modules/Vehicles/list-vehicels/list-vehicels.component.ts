import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { IVehicels } from 'src/app/interfaces/vehicels.interface';
import { VehiclesService } from 'src/app/services';
 

@Component({
  selector: 'ss-list-vehicels',
  templateUrl: './list-vehicels.component.html',
  styleUrls: ['./list-vehicels.component.scss']
})
export class ListVehicelsComponent implements OnInit {
  cols: any[];
  loading: boolean;
  currentPage: number;
  Vehicels: IVehicels[] = [];
  nothingElse: boolean;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (max === Math.round(pos) && !this.nothingElse) {
      this.currentPage++;
      this.getVehicels(false);
    }
  }
  constructor(
    private srvVehicels: VehiclesService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'title', header: 'عنوان وسیله نقلیه' },
      { field: 'tourType', header: 'نوع وسیله نقلیه' }
    ];
    this.currentPage = 1;
    this.getVehicels(true);
  }

  getVehicels(firstLoad: boolean): void {
    if (firstLoad) {
      this.currentPage = 1;
      this.Vehicels = [];
    }
    this.loading = true;
    this.srvVehicels.getVehicle(this.currentPage).subscribe(res => {
      if (res.length === 0) {
        this.nothingElse = true;
      }
      this.Vehicels.push(...res);
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
        this.deleteVehicels(id);
      }
    });
  }

  deleteVehicels(id: number): void {
    this.srvVehicels.deleteVehicles(id).subscribe(() => {
      this.getVehicels(true);
    });
  }

  editVehicels(id: number): void {
    this.router.navigate([`../panel/vehicels/form-vehicels/${id}`]);
  }

}
