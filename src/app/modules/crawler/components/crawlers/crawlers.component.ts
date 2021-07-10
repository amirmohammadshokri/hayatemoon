import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ICrawlerRoute } from 'src/app/interfaces';
import { CrawlerService, DataService, SearchService } from 'src/app/services';

@Component({
  selector: 'ss-crawlers',
  templateUrl: './crawlers.component.html',
  styleUrls: ['./crawlers.component.scss']
})
export class CrawlersComponent implements OnInit {

  routes: ICrawlerRoute[] = [];
  locations: any[] = [];

  constructor(
    private srvCrwlr: CrawlerService,
    private srvData: DataService,
    private srvSrch: SearchService,
    private srvMsg: MessageService
  ) { }

  ngOnInit(): void {
    this.getRoutes();
  }

  getRoutes() {
    this.srvData.showMainProgressBarForMe();
    this.srvCrwlr.getRouts().subscribe(res => {
      this.routes = res;
      this.srvData.thanksMainProgressBar();
    });
  }

  getLocations(event: any): void {
    this.srvData.showMainProgressBarForMe();
    this.srvSrch.getLocation(event.query).subscribe(res => {
      this.locations = res;
      this.srvData.thanksMainProgressBar();
    });
  }

  addRoute(e, route: ICrawlerRoute) {
    route.locations.push({ id: e.locationId, title: e.title });
  }

  removeRoute(route: ICrawlerRoute, i) {
    route.locations.splice(i, 1);
  }

  saveRoutes(route: ICrawlerRoute) {
    route.saving = true;
    this.srvCrwlr.addRout({
      crawlerId: route.id,
      locations: route.locations.map(l => l.id)
    }).subscribe(res => {
      this.srvMsg.add({ severity: 'success', summary: 'ویرایش کراولر', detail: 'عملیات با موفقیت انجام شد' });
      route.saving = false;
    }, () => {
      route.saving = false;
    });
  }

}
