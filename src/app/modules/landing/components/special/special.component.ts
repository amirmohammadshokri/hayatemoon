import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AdverService } from 'src/app/services/adver.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'sc-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.scss']
})
export class SpecialComponent implements OnInit, AfterViewInit {

  advs: any[] = [];
  responsiveOptions: any;
  cities: any[] = [];
  topCities: any[] = [];

  constructor(private sAdver: AdverService, private router: Router) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit(): void {
    this.sAdver.getCities().forEach((city, i) => {
      if (i < 5) {
        this.topCities.push(city);
      } else {
        this.cities.push(city);
      }
    });
    this.menuClicked(0, this.topCities[0].value);
  }

  getData(city: string): void {
    this.sAdver.getSpecialAdvers(city).subscribe(res => {
      this.advs = res;
    });
  }

  ngAfterViewInit(): void {
    $('#menu0').addClass('active');
    $('#dash0').addClass('dash');
  }

  menuClicked(i: number, city: string): void {
    $('[id^=menu]').removeClass('active');
    $('#menu' + i).addClass('active');

    $('[id^=dash]').removeClass('dash');
    $('#dash' + i).addClass('dash');

    this.getData(city);
  }

  show(adv: any): void {
    this.router.navigate([`/ads/info/${adv.id}`]);
  }

}
