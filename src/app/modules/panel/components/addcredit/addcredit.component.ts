import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sc-addcredit',
  templateUrl: './addcredit.component.html',
  styleUrls: ['./addcredit.component.scss']
})
export class AddcreditComponent implements OnInit {

  city: string;

  selectedCategory: any = null;

  categories: any[] = [
    {name: '$10', key: 'A'}, 
  {name: '$15', key: 'M'},
   {name: '$20', key: 'P'},
   {name: '$25', key: 'P'},
    {name: 'Optional  ( less than $100 )', key: 'R'}]; 

  constructor() { }

  ngOnInit(): void {
    this.selectedCategory = this.categories[1];
  }
}
