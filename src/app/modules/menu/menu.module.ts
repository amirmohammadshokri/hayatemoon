import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { ListMenuComponent } from './components/list-menu/list-menu.component';
import { FormMenuComponent } from './components/form-menu/form-menu.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TreeTableModule } from 'primeng/treetable';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ChooseMenuComponent } from './components/choose-menu/choose-menu.component';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { GalleriaModule } from 'primeng/galleria';
import { TreeModule } from 'primeng/tree';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [ListMenuComponent, FormMenuComponent, ChooseMenuComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
    ConfirmDialogModule,
    TreeTableModule,
    ToolbarModule,
    FormsModule,
    CheckboxModule,
    GalleriaModule,
    TreeModule,
    InputTextModule,
    ButtonModule
  ],
  providers: [
    ConfirmationService,
    DialogService
  ]
})
export class MenuModule { }
