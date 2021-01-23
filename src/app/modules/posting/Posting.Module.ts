import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { PostingRoutingModule } from './posting.routing.module';
import { ShareModule } from '../share/share.module';
import { PostAdverComponent } from './components/post-adver/post-adver.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { UpgradeComponent } from './components/upgrade/upgrade.component';
 
import { MenuComponent } from './components/menu/menu.component';
import { ManageAdverComponent } from './components/manage-adver/manage-adver.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    MainComponent,
    PostAdverComponent,
    UpgradeComponent,
     ManageAdverComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    PostingRoutingModule,
    ShareModule,
    ButtonModule,
    RippleModule,
    DropdownModule,
    MatInputModule,
    MatButtonModule,
    TieredMenuModule,
    RadioButtonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:(http:HttpClient)=>{return new TranslateHttpLoader(http,'./assets/i18n/','.json');},
        deps:[HttpClient]
      }
    })
  ]
})
export class PostingModule {
}
