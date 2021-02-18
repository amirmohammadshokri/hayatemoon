import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AdverService } from 'src/app/services/adver.service';

@Component({
  selector: 'sc-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.scss']
})
export class MyAdsComponent implements OnInit {

  constructor(private sAd: AdverService, private sMsg: MessageService) { }

  ngOnInit(): void {
    this.sAd.findMine().subscribe(res => {

    });
  }

}
