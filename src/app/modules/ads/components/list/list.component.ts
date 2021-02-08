import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { IAdvertisement } from 'src/app/interfaces';
import { AdverService } from 'src/app/services/adver.service';

@Component({
  selector: 'sc-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  selectedFilter: number = null;
  cities: any[] = [];
  city: string;
  category: any;
  categories: any[] = [];
  advs: IAdvertisement[] = [];

  constructor(private sAdver: AdverService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(prams => {
      this.cities = this.sAdver.getCities();
      this.categories = this.sAdver.getCategories();
      this.city = prams.city;
      this.category = this.findCategory(prams.category);
      this.getData();
    });
  }

  findCategory(value: string): any {
    let res = null;
    this.categories.forEach(category => {
      if (category.value === value) {
        res = category;
        return;
      } else {
        category.items?.forEach(item => {
          if (item.value === value) {
            res = item;
            return;
          }
        });
      }
    });
    return res;
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

  show(adv: any): void {
    this.router.navigate([`/ads/info/${adv.id}`]);
  }

  getData(): void {
    this.sAdver.getAdvers(this.city, this.category.value).subscribe((res: any) => {
      this.advs = res;
    });
  }

}
