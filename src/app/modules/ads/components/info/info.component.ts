import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAdvertisement } from 'src/app/interfaces';
import { AdverService } from 'src/app/services/adver.service';

@Component({
  selector: 'sc-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  adv: IAdvertisement;

  constructor(private route: ActivatedRoute, private sAdv: AdverService) { }

  ngOnInit(): void {
    this.route.params.subscribe(prams => {
      this.sAdv.getAdver(prams.id).subscribe(res => {
        this.adv = res;
      });
    });
  }

}
