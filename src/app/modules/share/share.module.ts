import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './components/topbar/topbar.component';
import { AdvCardComponent } from './components/adv-card/adv-card.component';



@NgModule({
  declarations: [
    TopbarComponent,
    AdvCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TopbarComponent,
    AdvCardComponent
  ]
})
export class ShareModule { }
