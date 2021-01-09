import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import * as $ from 'jquery';

@Component({
  selector: 'sc-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, AfterViewInit {

  menus: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.menus = [
      { label: 'My Ads', id: 'myads' },
      { label: 'User Profile', id: 'profile' },
      { label: 'Add Credit', id: 'addcredit' },
      { label: 'Marked Ads', id: 'markedads' },
      { label: 'Security', id: 'security' }
    ];
    $('.circle-loader').addClass('load-complete');
    $('.checkmark').toggle();
  }

  ngAfterViewInit(): void {
    $('#menu0').addClass('active');
    $('#dash0').addClass('dash');
  }

  menuClicked(i): void {
    $('[id^=menu]').removeClass('active');
    $('#menu' + i).addClass('active');

    $('[id^=dash]').removeClass('dash');
    $('#dash' + i).addClass('dash');
  }

}
