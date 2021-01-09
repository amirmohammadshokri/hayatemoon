import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sc-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  selectedCategory: any = null;

  categories: any[] = [
    {icon: 'fa fa-inbox', name: 'All Ads'}, 
    {icon: 'fa fa-inbox', name: 'Estate'}, 
    {icon: 'fa fa-inbox', name: 'All Ads'}, 
    {icon: 'fa fa-inbox', name: 'All Ads'}, 
    {icon: 'fa fa-inbox', name: 'All Ads'}, 
    {icon: 'fa fa-inbox', name: 'All Ads'}, 
    {icon: 'fa fa-inbox', name: 'All Ads'},
    
  
 ]; 

  constructor() { }

  ngOnInit(): void {
    this.selectedCategory = this.categories[1];
  }

}
