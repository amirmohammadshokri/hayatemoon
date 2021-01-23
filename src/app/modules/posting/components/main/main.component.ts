import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'sc-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  suportlanguage=['En','فا','Tr'];
  selectedCategory: number = 1;
  constructor(private route: ActivatedRoute,private router: Router,private TranslateService:TranslateService) {
    this.TranslateService.addLangs(this.suportlanguage);
    this.TranslateService.setDefaultLang('En');
   const browserlang=this.TranslateService.getBrowserLang();
   this.TranslateService.use(browserlang);

  }
  selectedlang(lang:string){
    this.TranslateService.use(lang);
  }

  

  ngOnInit(): void {
    this.route.params.subscribe(prms => {
      console.log(prms);

    });
  }

  onSelectCategory(id: number): void {
    this.selectedCategory = id;
  }

}