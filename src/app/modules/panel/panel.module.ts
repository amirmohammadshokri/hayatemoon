import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { PanelRoutingModule } from './panel.routing.module';
import { AddcreditComponent } from './components/addcredit/addcredit.component';
import { MarkedadsComponent } from './components/markedads/markedads.component';
import { SecurityComponent } from './components/security/security.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { PanelComponent } from './components/panel/panel.component';
import { ShareModule } from '../share/share.module';
import { MyAdsComponent } from './components/my-ads/my-ads.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';
import { ErrorInterceptor } from 'src/app/interceptors/error.interceptor';
import { AdverService } from 'src/app/services/adver.service';



@NgModule({
  declarations: [
    PanelComponent,
    AddcreditComponent,
    MarkedadsComponent,
    SecurityComponent,
    UserprofileComponent,
    MyAdsComponent
  ],
  imports: [
    PanelRoutingModule,
    CommonModule,
    RippleModule,
    ButtonModule,
    MatInputModule,
    MatButtonModule,
    TieredMenuModule,
    ShareModule,
    RadioButtonModule,
    FormsModule,
    TranslateModule
  ],
  providers: [
    AuthService,
    AdverService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class PanelModule { }
