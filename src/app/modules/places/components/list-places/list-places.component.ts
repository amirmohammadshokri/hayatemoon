import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { IPlaces } from 'src/app/interfaces/places.interface';
import { PlacesService } from 'src/app/services';

@Component({
  selector: 'ss-list-places',
  templateUrl: './list-places.component.html',
  styleUrls: ['./list-places.component.scss']
})
export class ListPlacesComponent implements OnInit {


  cols: any[];
  loading: boolean;
  currentPage: number=1;
  places: IPlaces[] = [];

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (max - 5 <= Math.round(pos) && Math.round(pos) <= max + 5) {
      this.currentPage++;
      this.getPlaces();
    }
  }
  constructor(
    private srvPlaces: PlacesService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'title', header: 'عنوان اماکن' }
    ];
    this.getPlaces();
  }

  getPlaces(): void {
    this.loading = true;
    
    this.places = [];
    this.srvPlaces.getPlaces(this.currentPage).subscribe(res => {
      this.places.push(...res);
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
        this.deletePlaces(id);
      }
    });
  }
  deletePlaces(id: number): void {
    this.srvPlaces.deletePlace(id).subscribe(() => {
      this.getPlaces();
    });
  }
  editPlaces(id: number): void {
    this.router.navigate([`../panel/places/form-palces/${id}`]);
  }
}
