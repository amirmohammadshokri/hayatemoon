import { Component, Inject, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { PromotionService, SearchService } from 'src/app/services';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'ss-form-promotion-tour',
  templateUrl: './form-promotion-tour.component.html',
  styleUrls: ['./form-promotion-tour.component.scss']
})
export class FormPromotionTourComponent implements OnInit {

  tours: any[] = [];
  promotions: SelectItem[] = [];
  selectedTour: any;
  tourPros: any[] = [];
  tourId: number;
  rawPromotions: any[];
  router: any;

  constructor(
    private srcSrch: SearchService,
    private srvpro: PromotionService,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.srvpro.getpromotions(null, 1).subscribe(res => {
      this.promotions = res.map(r => ({ label: r.title, value: r.id, }));
      this.rawPromotions = res;
    })
  }

  getTour(event: any): void {
    this.srcSrch.getTour(event.query).subscribe(res => {
      this.tours = res;
    });
  }

  getTourById(): void {
    this.srvpro.getpromotionTourById(this.selectedTour.id).subscribe(res => {
      this.tourPros.push(res)
      this.selectedTour = null;
    })
  }

  removeTour(i) {
    this.tourPros.splice(i, 1);
  }

  changePromotion(rowData) {
    rowData.price = (this.rawPromotions.find(p => p.id == rowData.proId)?.price ?? 0);
  }

  get price() {
    let sum = 0;
    this.tourPros.forEach(t => {
      sum += (this.rawPromotions.find(p => p.id == t.proId)?.price ?? 0);
    })
    return sum;
  }

  pay() {
    const val = {
      promotions: this.tourPros.map(t => ({
        promotionId: t.proId,
        tourId: t.tourId
      }))
    }
    this.srvpro.promotionFactor(val).subscribe(res => {
      this.document.location.href = 'https://getway.gashtineh.com/Payment/PreFactor?resNum='+res;
    })
  }

}
