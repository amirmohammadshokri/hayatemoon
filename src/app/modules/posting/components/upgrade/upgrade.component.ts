import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'sc-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss']
})
export class UpgradeComponent implements OnInit {
  suportlanguage=['En','فا','Tr'];

    constructor(private router: Router,private TranslateService:TranslateService) {
    this.TranslateService.addLangs(this.suportlanguage);
     this.TranslateService.setDefaultLang('En');
    const browserlang=this.TranslateService.getBrowserLang();
    this.TranslateService.use(browserlang);
   }
     selectedlang(lang:string){
    this.TranslateService.use(lang);
  }
  
active:boolean;
  ngOnInit(): void {
  
  }
  clickedleft()
  {
    this.active=!this.active;
  }
  clickedright(){
    this.active=!this.active;
  }

}
