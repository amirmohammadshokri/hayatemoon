import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { MenuComponent } from './components/menu/menu.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { PanelRoutingModule } from './panel.routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TooltipModule } from 'primeng/tooltip';
import { BadgeModule } from 'primeng/badge';

@NgModule({
  declarations: [
    LayoutComponent,
    MenuComponent,
    TopbarComponent
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    InputTextModule,
    DropdownModule,
    HttpClientModule,
    FormsModule,
    ButtonModule,
    RatingModule,
    TooltipModule,
    BadgeModule
  ],
  providers: []
})
export class PanelModule { }
