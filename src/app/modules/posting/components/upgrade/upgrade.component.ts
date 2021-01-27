import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'sc-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss']
})
export class UpgradeComponent implements OnInit {

  active: boolean;
  type: string;
  typeDetail: number;

  constructor() {
    this.typeDetail = 1;
  }

  ngOnInit(): void {
  }

  clickedleft(): void {
    this.active = !this.active;
  }

  clickedright(): void {
    this.active = !this.active;
  }

}
