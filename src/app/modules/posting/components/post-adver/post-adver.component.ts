import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'sc-post-adver',
  templateUrl: './post-adver.component.html',
  styleUrls: ['./post-adver.component.scss']
})

export class PostAdverComponent implements OnInit {


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


  ngOnInit(): void {
  }

}
