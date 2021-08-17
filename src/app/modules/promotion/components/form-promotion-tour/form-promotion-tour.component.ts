import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ITourSearch } from 'src/app/interfaces/searchTour.interface';
import { PromotionService, SearchService } from 'src/app/services';

@Component({
  selector: 'ss-form-promotion-tour',
  templateUrl: './form-promotion-tour.component.html',
  styleUrls: ['./form-promotion-tour.component.scss']
})
export class FormPromotionTourComponent implements OnInit {

  tours: any[] = [];
  selecteTours: any[] = [];
  tourId:number;

  constructor( private srcSrch: SearchService,
               private srvpro:PromotionService) 
               { }

  ngOnInit(): void {
  }
  getTour(event: any): void {
    this.srcSrch.getTour(event.query).subscribe(res => {
      this.tours = res;
    });
  }

  getTourById():void{
    if(this.selecteTours===null)
    console.log('44444444555555555');
    else
    console.log('99999999999');
// this.tourId=
    //  this.srvpro.getpromotionTourById(id).subscribe(res => {
    //   this.tours = res;
    // });
  }


}
