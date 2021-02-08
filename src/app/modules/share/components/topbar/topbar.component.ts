import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery';
import { SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'sc-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  showMenu: boolean;
  showLng: boolean;
  suportlanguage: SelectItem[] = [
    { label: 'En', value: 'en' },
    { label: 'Tr', value: 'tr' },
    { label: 'فا', value: 'fa' }
  ];
  user: any;

  constructor(
    private router: Router,
    private sAuth: AuthService,
    private translateService: TranslateService) { }

  ngOnInit(): void {
    const token = this.sAuth.getToken();
    if (token) {
      this.sAuth.getUserInfo().subscribe(res => {
        this.user = res;
      });
    }
    this.showLng = true;
    $(window).scroll(() => {
      const scroll = $(window).scrollTop();
      if (scroll >= 100) {
        $('.topbar').addClass('glass');
      } else {
        $('.topbar').removeClass('glass');
      }
    });
  }

  showLangs(): void {
    if (this.showLng) {
      $('.lngs').css('display', 'inline');
    } else {
      $('.lngs').css('display', 'none');
    }
    this.showLng = !this.showLng;
  }

  selectedlang(lang: string): void {
    this.translateService.use(lang);
    $('.lngs').css('display', 'none');
    this.showLng = false;
    if (lang === 'fa') {
      $('body').css('direction', 'rtl');
      $('body').css('font-family', 'IRANSansWeb');
      $('#main-root').addClass('main-root-rtl');
      $('#main-root').removeClass('main-root-ltr');
    } else {
      $('body').css('font-family', 'Heebo');
      $('body').css('direction', 'ltr');
      $('#main-root').removeClass('main-root-rtl');
      $('#main-root').addClass('main-root-ltr');
    }
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {
    this.sAuth.logout();
  }

}
