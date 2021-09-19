import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMenuComponent } from './components/form-menu/form-menu.component';
import { ListMenuComponent } from './components/list-menu/list-menu.component';
import { MenuRoleAccessComponent } from './components/menu-role-access/menu-role-access.component';
import { MenuRolesComponent } from './components/menu-roles/menu-roles.component';

const routes: Routes = [
  { path: 'list', component: ListMenuComponent },
  { path: 'form/:id', component: FormMenuComponent },
  { path: 'menu-role', component: MenuRolesComponent },
  { path: 'menu-role-access', component: MenuRoleAccessComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
