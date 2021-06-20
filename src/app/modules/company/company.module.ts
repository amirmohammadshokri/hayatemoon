import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { ListUserComponent } from './components/list-user/list-user.component';
import { ListCompanyComponent } from './components/list-company/list-company.component';
import { FormCompanyComponent } from './components/form-company/form-company.component';
import { FormUserComponent } from './components/form-user/form-user.component';


@NgModule({
  declarations: [ListUserComponent, ListCompanyComponent, FormCompanyComponent, FormUserComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule
  ]
})
export class CompanyModule { }
