import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'ss-hotel-from',
  templateUrl: './hotel-from.component.html',
  styleUrls: ['./hotel-from.component.scss']
})
export class HotelFromComponent implements OnInit {

  hotelTypes: any[] = [];
  constructor(private srvHotel: HotelService) { }

  ngOnInit(): void {
    this.getHotelType();
  }

  getHotel(): void {
    this.srvHotel.getHotels
  }

  getHotelType(): void {
    this.srvHotel.getHotelType().subscribe(res => {
      this.hotelTypes = res;
    });
  }

}
