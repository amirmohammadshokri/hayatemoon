import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from '../auth/auth.component';
import { AuthRoutingModule } from './auth.routing.module';
import { ForgetpassComponent } from './components/forgetpass/forgetpass.component';
import { ResetpassComponent } from './components/resetpass/resetpass.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ShareModule } from '../share/share.module';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ErrorInterceptor } from 'src/app/interceptors/error.interceptor';
import { MainComponent } from './components/main/main.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';


@NgModule({
  declarations: [
    AuthComponent,
    ForgetpassComponent,
    ResetpassComponent,
    LoginComponent,
    SignupComponent,
    MainComponent,
    ConfirmEmailComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RippleModule,
    ButtonModule,
    MatInputModule,
    MatButtonModule,
    TieredMenuModule,
    ShareModule,
    TranslateModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class AuthModule { }
