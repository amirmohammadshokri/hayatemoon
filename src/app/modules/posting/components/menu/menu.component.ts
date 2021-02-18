import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';
import * as $ from 'jquery';
import { AdverService } from 'src/app/services/adver.service';


@Component({
  selector: 'sc-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  categories: MenuItem[] = [];
  @Output() selectCategory = new EventEmitter<string>();

  constructor(private sAd: AdverService) {
    this.categories = this.sAd.getCategories().filter(c => c.value !== 'همه ی آگهی ها');
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

  menuItemClicked(value: string): void {
    this.selectCategory.emit(value);
  }

}
