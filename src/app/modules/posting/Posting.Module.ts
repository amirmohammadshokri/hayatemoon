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
import { EditAdComponent } from './components/edit-ad/edit-ad.component';
import { MenuComponent } from './components/menu/menu.component';


@NgModule({
  declarations: [
    MainComponent,
    PostAdverComponent,
    UpgradeComponent,
    EditAdComponent,
    MenuComponent
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
    RadioButtonModule
  ]
})
export class PostingModule {
}
