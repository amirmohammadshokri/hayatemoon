import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'sc-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  advs: any[] = [];
  showContactInfo: boolean;
  marked: boolean;
  details: any[] = [];

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.advs.push({
      id: '1000'
    });
    this.advs.push({
      id: '100'
    });

    this.details = [
      { title: 'Category', value: 'Job, Education' },
      { title: 'Location', value: 'Istanbul, Kayaş' },
      { title: 'Degree', value: 'Master' },
      { title: 'Work Background', value: 'Teaching in English School' },
      { title: 'Price', value: '$ 1,500' },
    ];
  }

  close(): void {
    this.ref.close();
  }

}
