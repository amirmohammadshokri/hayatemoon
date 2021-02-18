import { Component, OnInit } from '@angular/core';
import { IAdvertisement } from 'src/app/interfaces';

@Component({
  selector: 'sc-manage-adver',
  templateUrl: './manage-adver.component.html',
  styleUrls: ['./manage-adver.component.scss']
})
export class ManageAdverComponent implements OnInit {

  mode: number;
  advertisement: IAdvertisement;

  constructor() {
    this.mode = 1;
  }

  ngOnInit(): void {
  }

}
