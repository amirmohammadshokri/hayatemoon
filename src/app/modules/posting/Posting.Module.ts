import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostingRoutingModule } from './posting.routing.module';
import { ShareModule } from '../share/share.module';
import { PostAdverComponent } from './components/post-adver/post-adver.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { UpgradeComponent } from './components/upgrade/upgrade.component';
import { MenuComponent } from './components/menu/menu.component';
import { ManageAdverComponent } from './components/manage-adver/manage-adver.component';
import { TranslateModule } from '@ngx-translate/core';
import { MainComponent } from './components/main/main.component';
import { FormsModule } from '@angular/forms';
import { AdsModule } from '../ads/ads.module';
import { AdverService } from 'src/app/services/adver.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';
import { ErrorInterceptor } from 'src/app/interceptors/error.interceptor';


@NgModule({
  declarations: [
    PostAdverComponent,
    UpgradeComponent,
    ManageAdverComponent,
    MenuComponent,
    MainComponent
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
    RadioButtonModule,
    TranslateModule,
    FormsModule,
    AdsModule
  ],
  providers: [
    AdverService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class PostingModule {
}
