import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'ss-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('.sidebar-pin').click(() => {
      $('#layout').toggleClass('layout-static');
      $('.welcome').toggleClass('set-margin');
    });
  }

}
