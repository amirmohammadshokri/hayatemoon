import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'sc-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    $(window).scroll(() => {
      const scroll = $(window).scrollTop();
      if (scroll >= 100) {
        $('.topbar').addClass('glass');
      } else {
        $('.topbar').removeClass('glass');
      }
    });
  }

  navigate(route: string): void {
    console.log(route);

    this.router.navigate([route]);
  }

}
