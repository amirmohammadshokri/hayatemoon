import { Component, OnInit } from '@angular/core';
import { AdverService } from 'src/app/services/adver.service';

@Component({
  selector: 'sc-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.scss']
})
export class SpecialComponent implements OnInit {

  advs: any[] = [];
  responsiveOptions;

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
  }

}
