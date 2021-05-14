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
        label: 'مدیریت هتل', icon: 'pi pi-map', items: [
          { label: 'لسیت هتل ها', icon: 'pi pi-list', routerLink: ['hotel/hotels'] },
          { label: 'امکانات هتل ', icon: 'pi pi-list', routerLink: ['hotel/hotel-facilitieskinds'] },
          { label: 'امکانات اتاق', icon: 'pi pi-list', routerLink: ['hotel/room-facilitieskinds'] },
          { label: 'انوع اتاق', icon: 'pi pi-list', routerLink: ['hotel/room-kinds'] }
        ]
      },
      {
        label: 'مدیریت اقامتگاه', icon: 'pi pi-map', items: [
          { label: 'لسیت اقامتگاه ها', icon: 'pi pi-list', routerLink: ['residence/residence'] },
          { label: 'لیست امکانات اقامتگاه ', icon: 'pi pi-list', routerLink: ['residence/residence-facilitieskinds'] },
        ]
      }
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
