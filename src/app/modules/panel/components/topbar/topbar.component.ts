import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import * as $ from 'jquery';
import { DataService, TicketingService } from 'src/app/services';


@Component({
  selector: 'ss-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  avatar = 'assets/user.svg';
  unreadedTicket: number = 0;
  darkMode: boolean = true;

  constructor(
    private srvTicket: TicketingService,
    private srvOidc: OidcSecurityService,
    private sData: DataService) { }

  ngOnInit(): void {
    $('#user').click(() => {
      $('.user-profile').toggleClass('active-topmenuitem fadeInDown');
    });

    $(document).click((e) => {
      if (e.target.id !== 'user' && e.target.id !== 'user-img') {
        $('.user-profile').removeClass('active-topmenuitem fadeInDown');
      }
    });

    $('.search-item').click(() => {
      $('.search-item').addClass('active-topmenuitem');
    });

    $(document).click((e) => {
      if (e.target.className !== 'p-inputtext p-component' && e.target.className !== 'topbar-icon pi pi-search') {
        $('.search-item').removeClass('active-topmenuitem');
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

    this.sData.userInfo$.subscribe((res) => {
      if (res > 0) {
        this.srvTicket.unreadTicketCount().subscribe(count => {
          this.unreadedTicket = count;
        });
      }
    })
  }


  changeMode() {
    $('#loading').css("display", "flex")

    document.head.removeChild(document.getElementById('theme-css'));
    document.head.removeChild(document.getElementById('layout-css'));

    if (this.darkMode) {
      let linkTheme: HTMLLinkElement = document.createElement('link');
      linkTheme.setAttribute('rel', 'stylesheet');
      linkTheme.setAttribute('id', 'theme-css');
      linkTheme.setAttribute('href', 'assets/theme/theme-light.css');
      document.head.appendChild(linkTheme);
      let linkLayout: HTMLLinkElement = document.createElement('link');
      linkLayout.setAttribute('rel', 'stylesheet');
      linkLayout.setAttribute('id', 'layout-css');
      linkLayout.setAttribute('href', 'assets/theme/layout-light.css');
      document.head.appendChild(linkLayout);

      $('#layout').removeClass('layout-menu-dark');
      $('#layout').removeClass('layout-topbar-dark');
      $('#layout').addClass('layout-menu-light');
      $('#layout').addClass('layout-topbar-light');
      setTimeout(() => {
        $('#loading').css("display", "none")
      }, 800);
    } else {
      let linkTheme: HTMLLinkElement = document.createElement('link');
      linkTheme.setAttribute('rel', 'stylesheet');
      linkTheme.setAttribute('id', 'theme-css');
      linkTheme.setAttribute('href', 'assets/theme/theme-dark.css');
      document.head.appendChild(linkTheme);
      let linkLayout: HTMLLinkElement = document.createElement('link');
      linkLayout.setAttribute('rel', 'stylesheet');
      linkLayout.setAttribute('id', 'layout-css');
      linkLayout.setAttribute('href', 'assets/theme/layout-dark.css');
      document.head.appendChild(linkLayout);

      $('#layout').removeClass('layout-menu-light');
      $('#layout').removeClass('layout-topbar-light');
      $('#layout').addClass('layout-menu-dark');
      $('#layout').addClass('layout-topbar-dark');
      setTimeout(() => {
        $('#loading').css("display", "none")
      }, 800);
    }
    this.darkMode = !this.darkMode;
  }

  signout(): void {
    this.srvOidc.logoff();
  }

  defaultAvatar(): void {
    this.avatar = 'assets/user.svg';
  }

}
