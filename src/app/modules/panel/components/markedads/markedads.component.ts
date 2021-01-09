import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sc-markedads',
  templateUrl: './markedads.component.html',
  styleUrls: ['./markedads.component.scss']
})
export class MarkedadsComponent implements OnInit {

  ads: any[] = [
    {name: 'ahmad',price:1000},
    {name: 'amir',price:2000},
    {name: 'taghi',peice:5000},
    {name: 'taghi',peice:5000},
    {name: 'taghi',peice:5000},
    {name: 'taghi',peice:5000}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
