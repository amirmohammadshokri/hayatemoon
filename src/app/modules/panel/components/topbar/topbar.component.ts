import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { TicketingService } from 'src/app/services';


@Component({
  selector: 'ss-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  avatar = 'assets/user.svg';
  unreadedTicket: number;

  constructor(private srvTicket: TicketingService) { }

  ngOnInit(): void {
    $('.search-item').click(() => {
      $('.search-item').addClass('active-topmenuitem');
    });

    $(document).click((e) => {
      if (e.target.className !== 'p-inputtext p-component' && e.target.className !== 'topbar-icon pi pi-search') {
        $('.search-item').removeClass('active-topmenuitem');
      }
    });

    $('#user').click(() => {
      $('.user-profile').toggleClass('active-topmenuitem fadeInDown');
    });

    $(document).click((e) => {
      if (e.target.id !== 'user' && e.target.id !== 'user-img') {
        $('.user-profile').removeClass('active-topmenuitem fadeInDown');
      }
    });

    $('#menu-button').click(() => {
      $('body').toggleClass('blocked-scroll');
      $('#layout').toggleClass('layout-mobile-active');
    });

    $(document).click((e) => {
      if (!(e.target.id === 'menu-button' ||
        e.target.id === 'menu-button-i' ||
        $(e.target).parents('.headerMenu').length ||
        $(e.target).attr('class') === 'layout-menu-container')) {
        $('body').removeClass('blocked-scroll');
        $('#layout').removeClass('layout-mobile-active');
      }
    });

    this.srvTicket.unreadTicketCount().subscribe(count => {
      this.unreadedTicket = count;
    });
  }

  signout(): void {
  }

  defaultAvatar(): void {
    this.avatar = 'assets/user.svg';
  }

}
