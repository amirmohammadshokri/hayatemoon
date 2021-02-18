import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'sc-post-adver',
  templateUrl: './post-adver.component.html',
  styleUrls: ['./post-adver.component.scss']
})

export class PostAdverComponent implements OnInit {

  @Output() changeCategory = new EventEmitter<boolean>();
  @Output() postAd = new EventEmitter<boolean>();
  @Input() selectedCategory: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  post(): void {
    this.postAd.emit(true);
  }

  onChangeCategory(): void {
    this.changeCategory.emit(true);
  }

}
