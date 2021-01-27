import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sc-addcredit',
  templateUrl: './addcredit.component.html',
  styleUrls: ['./addcredit.component.scss']
})
export class AddcreditComponent implements OnInit {

  selectedPrice: number;
  prices: any[] = [
    { name: '₺10', key: 10 },
    { name: '₺15', key: 15 },
    { name: '₺20', key: 20 },
    { name: '₺25', key: 25 }
  ];

  constructor() { }

  ngOnInit(): void {
    this.selectedPrice = this.prices[0].key;
  }
}
