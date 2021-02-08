import { Component, Input, OnInit } from '@angular/core';
import { IAdvertisement } from 'src/app/interfaces';

@Component({
  selector: 'sc-ads-info',
  templateUrl: './ads-info.component.html',
  styleUrls: ['./ads-info.component.scss']
})
export class AdsInfoComponent implements OnInit {

  showContactInfo: boolean;
  marked: boolean;
  details: any[] = [];
  @Input() className: string;
  @Input() advertisement: IAdvertisement;

  constructor() { }

  ngOnInit(): void { }

  timeSince(date: any): { count: number, label: string } {
    const dt = new Date(date);
    const seconds = Math.floor((new Date().getTime() - dt.getTime()) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return { count: interval, label: 'Years ago' };
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return { count: interval, label: 'Months ago' };
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return { count: interval, label: 'Days ago' };
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return { count: interval, label: 'Hours ago' };
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return { count: interval, label: 'Minutes ago' };
    }
    return { count: Math.floor(seconds), label: 'Seconds ago' };
  }

}
