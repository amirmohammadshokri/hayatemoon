import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { ListUserComponent } from './components/list-user/list-user.component';
import { ListCompanyComponent } from './components/list-company/list-company.component';


@NgModule({
  declarations: [ListUserComponent, ListCompanyComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule
  ]
})
export class CompanyModule { }
