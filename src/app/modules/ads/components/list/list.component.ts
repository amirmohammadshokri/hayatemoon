import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AdverService } from 'src/app/services/adver.service';
import { InfoComponent } from '../info/info.component';

@Component({
  selector: 'sc-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  selectedCategory: any = null;
  selectedFilter: number = null;

  categories: MenuItem[] = [
    { icon: 'pi pi-inbox', label: 'All Ads' },
    {
      icon: 'pi pi-inbox', label: 'Estate', items: [
        { label: 'Residental for Rent' },
        { label: 'Residental for Sale' },
        { label: 'Commercial for Rent' },
        { label: 'Commercial for Sale' }
      ]
    },
    { icon: 'pi pi-inbox', label: 'All Ads' },
    { icon: 'pi pi-inbox', label: 'Vehicle ( Buy )' },
    { icon: 'pi pi-inbox', label: 'Electronics' },
    { icon: 'pi pi-inbox', label: 'Home & Garden' },
    { icon: 'pi pi-inbox', label: 'Job' },
    { icon: 'pi pi-inbox', label: 'Services' },
  ];
  products: any[] = [];

  constructor(private sAdver: AdverService, public dialogService: DialogService) { }

  ngOnInit(): void {
    this.selectedCategory = this.categories[1];
    this.sAdver.getData().subscribe((res: any) => {
      this.products = res.data;
    });
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

  show(product: any): void {
    const ref = this.dialogService.open(InfoComponent, {
      width: '80%',
      showHeader: false,
      data: product
    });
  }

}
