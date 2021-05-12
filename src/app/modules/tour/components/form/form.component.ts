import { Component, OnInit } from '@angular/core';
import { ITypeTour } from 'src/app/interfaces';
import { TourService } from 'src/app/services/tour.service';
 

@Component({
  selector: 'ss-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  mainImageIndex: number;
  images: { mediaId: number, file: File, url: string }[] = [];

  items: ITypeTour[];
  item: string;
  constructor(private sTour:TourService) {
    this.sTour.getTourType().subscribe(res => {
      this.items = res;
    
    });
   }
 
   

  ngOnInit(): void {
  
 
  }

}
