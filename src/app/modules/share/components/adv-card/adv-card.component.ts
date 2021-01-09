import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sc-adv-card',
  templateUrl: './adv-card.component.html',
  styleUrls: ['./adv-card.component.scss']
})
export class AdvCardComponent implements OnInit {

  @Input() product: any;

  constructor() { }

  ngOnInit(): void {
  }

}
