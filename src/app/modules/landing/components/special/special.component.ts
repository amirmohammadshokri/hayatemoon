import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AdverService } from 'src/app/services/adver.service';
import * as $ from 'jquery';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'sc-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.scss']
})
export class SpecialComponent implements OnInit, AfterViewInit {

  advs: any[] = [];
  responsiveOptions;
  menus: MenuItem[] = [];

  constructor(private sAdver: AdverService) {
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
    this.sAdver.getData().subscribe((res: any) => {
      this.advs = res.data;
    });

    this.menus = [
      { label: 'Istanbul', id: 'Istanbul' },
      { label: 'Ankara', id: 'Ankara' },
      { label: 'Izmir', id: 'Izmir' },
      { label: 'Antalya', id: 'Antalya' },
      { label: 'Konya', id: 'Konya' }
    ];
  }

  ngAfterViewInit(): void {
    $('#menu0').addClass('active');
    $('#dash0').addClass('dash');
  }

  menuClicked(i): void {
    $('[id^=menu]').removeClass('active');
    $('#menu' + i).addClass('active');

    $('[id^=dash]').removeClass('dash');
    $('#dash' + i).addClass('dash');
  }

}
