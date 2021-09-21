import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages.routing.module';
import { ErrorComponent } from './components/error/error.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AccessdeniedComponent } from './components/accessdenied/accessdenied.component';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [ErrorComponent, NotfoundComponent, AccessdeniedComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ButtonModule
  ]
})
export class PagesModule { }
