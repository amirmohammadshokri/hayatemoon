import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { AdverService } from 'src/app/services/adver.service';

@Component({
  selector: 'sc-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {

  categories: any[] = [];
  cities: any[] = [];
  city: string;
  category: any;

  constructor(private sAdv: AdverService, private router: Router) { }

  ngOnInit(): void {
    this.categories = this.sAdv.getCategories();
    this.cities = this.sAdv.getCities();
  }

  goToList(): void {
    this.router.navigate(['/ads', { city: this.city, category: this.category.value }]);
  }

}
