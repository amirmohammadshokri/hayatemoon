import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'sc-adv-card',
  templateUrl: './adv-card.component.html',
  styleUrls: ['./adv-card.component.scss']
})
export class AdvCardComponent implements OnInit {

  @Input() product: any;
  @Output() selectProduct = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  selectPro(): void {
    this.selectProduct.emit(this.product);
  }

}
