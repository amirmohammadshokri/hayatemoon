import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sc-manage-adver',
  templateUrl: './manage-adver.component.html',
  styleUrls: ['./manage-adver.component.scss']
})
export class ManageAdverComponent implements OnInit {

  mode: number;

  constructor() {
    this.mode = 1;
  }

  ngOnInit(): void {
  }

}
