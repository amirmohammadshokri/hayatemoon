import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { MenuItem, SelectItem } from 'primeng/api';
import { DataService, MenuService, MyRoleService } from 'src/app/services';

@Component({
  selector: 'ss-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menuItems: MenuItem[] = [];
  companyId: number;

  constructor(
    private cdr: ChangeDetectorRef,
    private srvMenu: MenuService,
    private srvData: DataService,
    private srvRole: MyRoleService) {
    this.srvRole.getUserInfo().subscribe(user => {
      if (!!user) {
        this.srvData.showMainProgressBarForMe()
        this.srvMenu.getMenuRoles(user.CompanyTypeId).subscribe(res => {
          let accesAds = false;
          this.srvRole.getUserInfo().subscribe(user => {
            accesAds = (user.Permissions as string[]).indexOf('Ads') > -1
          })
          this.srvData.thanksMainProgressBar()
          res.forEach(mainMenu => {
            if (mainMenu.childs.filter(c => c.isSelected).length > 0) {
              let parent: MenuItem = {
                label: mainMenu.parent.title,
                icon: mainMenu.parent.iconMediaId,
                items: mainMenu.childs.filter(c => c.isSelected).map(c => ({
                  label: c.title,
                  icon: c.iconMediaId,
                  routerLink: [c.url]
                }))
              };
              if (mainMenu.parent.code == 'Ads') {
                if (accesAds) {
                  this.menuItems = [...this.menuItems, parent];
                }
              } else {
                this.menuItems = [...this.menuItems, parent];
              }
            }
          });
          this.setActiveMenu();
        })
      }
    })
  }

  ngOnInit(): void {
    $('.menu-wrapper').mouseenter(() => {
      $('.menu-wrapper').addClass('layout-sidebar-active');
    });

    $('.menu-wrapper').mouseleave(() => {
      $('.menu-wrapper').removeClass('layout-sidebar-active');
    });
  }

  setActiveMenu(): void {
    let activeMenu = JSON.parse(localStorage.getItem('activeMenu'))
    if (activeMenu) {
      this.headerMenuClick(activeMenu.i);
      this.itemMenuClick(activeMenu.i, activeMenu.j)
    }
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
    this.cdr.detectChanges();
  }

  itemMenuClick(i: number, j: number): void {
    // set header style
    $('[id^=headerMenu_]').removeClass('active-menuitem');
    $('#headerMenu_' + i).toggleClass('active-menuitem');

    // set item style
    $('[id^=itemMenu_]').removeClass('active-menuitem');
    $('#itemMenu_' + i + '' + j).toggleClass('active-menuitem');
    this.cdr.detectChanges();

    localStorage.setItem('activeMenu', JSON.stringify({ i, j }))
  }

}
