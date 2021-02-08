import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAdvertisement } from 'src/app/interfaces';


@Component({
  selector: 'sc-adv-card',
  templateUrl: './adv-card.component.html',
  styleUrls: ['./adv-card.component.scss']
})
export class AdvCardComponent implements OnInit {

  @Input() advertisement: IAdvertisement;
  @Output() selectProduct = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  selectPro(): void {
    this.selectProduct.emit(this.advertisement);
  }

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
