import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sc-ads-info',
  templateUrl: './ads-info.component.html',
  styleUrls: ['./ads-info.component.scss']
})
export class AdsInfoComponent implements OnInit {

  advs: any[] = [];
  showContactInfo: boolean;
  marked: boolean;
  details: any[] = [];
  @Input() className: string;

  constructor() { }

  ngOnInit(): void {
    this.advs.push({
      id: '1000'
    });
    this.advs.push({
      id: '100'
    });

    this.details = [
      { title: 'category', value: 'Job, Education' },
      { title: 'location', value: 'Istanbul, Kayaş' },
      { title: 'degree', value: 'Master' },
      { title: 'work Background', value: 'Teaching in English School' },
      { title: 'price', value: '$ 1,500' },
    ];
  }

}
