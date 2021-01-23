import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'sc-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  categories: MenuItem[] = [
    { icon: 'pi pi-inbox', label: 'All Ads' },
    {
      icon: 'pi pi-inbox', label: 'Estate', items: [
        { label: 'Residental for Rent', id: '1' },
        { label: 'Residental for Sale', id: '2' },
        { label: 'Commercial for Rent', id: '3' },
        { label: 'Commercial for Sale', id: '4' }
      ]
    },
    { icon: 'pi pi-inbox', label: 'All Ads' },
    { icon: 'pi pi-inbox', label: 'Vehicle ( Buy )' },
    { icon: 'pi pi-inbox', label: 'Electronics' },
    { icon: 'pi pi-inbox', label: 'Home & Garden' },
    { icon: 'pi pi-inbox', label: 'Job' },
    { icon: 'pi pi-inbox', label: 'Services' },
  ];
  @Output() selectCategory = new EventEmitter<number>();

  suportlanguage=['En','فا','Tr'];

  constructor(private router: Router,private TranslateService:TranslateService) {
  this.TranslateService.addLangs(this.suportlanguage);
   this.TranslateService.setDefaultLang('En');
  const browserlang=this.TranslateService.getBrowserLang();
  this.TranslateService.use(browserlang);
 }
   selectedlang(lang:string){
  this.TranslateService.use(lang);
}

  ngOnInit(): void {
  }

  menuHeaderClick(index: number): void {
    for (let i = 0; i < this.categories.length; i++) {
      if (i === index) {
        this.categories[index].visible = !this.categories[index].visible;
        $('#headerMenu' + index).toggleClass('active-menu-header');
      } else {
        this.categories[i].visible = false;
        $('#headerMenu' + i).removeClass('active-menu-header');
      }
    }
  }

  menuItemClicked(id: string): void {
    this.selectCategory.emit(Number.parseInt(id, 0));
  }

}
