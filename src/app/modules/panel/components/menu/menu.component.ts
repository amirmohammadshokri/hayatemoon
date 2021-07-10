import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { MenuItem, SelectItem } from 'primeng/api';

@Component({
  selector: 'ss-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {

  showMenu: boolean;
  menuItems: MenuItem[] = [];
  databases: SelectItem[] = [];
  companyId: number;
  menuIndex: number;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.menuItems = [
      { label: 'داشبورد', icon: 'pi pi-home', routerLink: ['dashboard'] },
      {
        label: 'مدیریت هتل', icon: 'fa fa-hotel', items: [
          { label: 'لسیت هتل ها', icon: 'pi pi-list', routerLink: ['hotel/hotels'] },
          { label: 'امکانات هتل ', icon: 'pi pi-list', routerLink: ['hotel/hotel-facilitieskinds'] },
          { label: 'امکانات اتاق', icon: 'pi pi-list', routerLink: ['hotel/room-facilitieskinds'] },
          { label: 'لیست اتاق ها', icon: 'pi pi-list', routerLink: ['hotel/rooms'] },
          { label: 'انوع اتاق', icon: 'pi pi-list', routerLink: ['hotel/room-kinds'] }
        ]
      },
      {
        label: 'مدیریت اقامتگاه', icon: 'fa fa-cutlery', items: [
          { label: 'لسیت اقامتگاه ها', icon: 'pi pi-list', routerLink: ['residence/residence'] },
          { label: 'لیست امکانات اقامتگاه ', icon: 'pi pi-list', routerLink: ['residence/residence-facilitieskinds'] },
          { label: 'لیست تقویم', icon: 'pi pi-list', routerLink: ['residence/calendar'] },
        ]
      },
      {
        label: 'مدیریت اماکن', icon: 'fa fa-map-marker', items: [
          { label: 'لسیت اماکن', icon: 'pi pi-list', routerLink: ['places/places'] }
        ]
      },
      {
        label: 'مدیریت تور', icon: 'fa fa-globe', items: [
          { label: 'لسیت تورها', icon: 'pi pi-list', routerLink: ['tour/tours'] }
        ]
      },
      {
        label: 'مدیریت تیکت ها', icon: 'fa fa-comments', items: [
          { label: 'لسیت تیکت ها', icon: 'pi pi-list', routerLink: ['ticket/tickets'] }
        ]
      },
      {
        label: 'مدیریت کانال ها', icon: 'fa fa-bullhorn', items: [
          { label: 'لسیت کانال ها', icon: 'pi pi-list', routerLink: ['chanel/chanels'] }
        ]
      },
      {
        label: 'مدیریت شرکت ها', icon: 'fa fa-home', items: [
          { label: 'لسیت شرکت ها', icon: 'pi pi-list', routerLink: ['company/companys'] },
          { label: 'لسیت کاربران شرکت ها', icon: 'pi pi-list', routerLink: ['company/users'] }
        ]
      },
      {
        label: 'مدیریت کرولر ها', icon: 'fa fa-ravelry', items: [
          { label: 'لسیت کرولر ها', icon: 'pi pi-list', routerLink: ['crawler/list'] }
        ]
      },
    ];
  }

  ngOnInit(): void {
    $('.menu-wrapper').mouseenter(() => {
      $('.menu-wrapper').addClass('layout-sidebar-active');
    });

    $('.menu-wrapper').mouseleave(() => {
      $('.menu-wrapper').removeClass('layout-sidebar-active');
    });

  }

  ngAfterViewInit(): void {
    this.headerMenuClick(this.menuIndex);
  }

  headerMenuClick(index: number): void {
    for (let i = 0; i < this.menuItems.length; i++) {
      if (i === index) {
        this.menuItems[index].visible = !this.menuItems[index].visible;
        $('#headerMenu_' + index).toggleClass('active-menuitem');
      }
      else {
        this.menuItems[i].visible = false;
        $('#headerMenu_' + i).removeClass('active-menuitem');
      }
    }
  }

  itemMenuClick(i: number, j: number): void {
    // set header style
    $('[id^=headerMenu_]').removeClass('active-menuitem');
    $('#headerMenu_' + i).toggleClass('active-menuitem');

    // set item style
    $('[id^=itemMenu_]').removeClass('active-menuitem');
    $('#itemMenu_' + i + '' + j).toggleClass('active-menuitem');
    this.cdr.detectChanges();
  }

}
