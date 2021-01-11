import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './components/topbar/topbar.component';
import { AdvCardComponent } from './components/adv-card/adv-card.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';



@NgModule({
  declarations: [
    TopbarComponent,
    AdvCardComponent,
    MainFooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TopbarComponent,
    AdvCardComponent,
    MainFooterComponent
  ]
})
export class ShareModule { }
