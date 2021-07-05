import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormCompanyComponent } from './components/form-company/form-company.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { ListCompanyComponent } from './components/list-company/list-company.component';
import { ListUserComponent } from './components/list-user/list-user.component';

const routes: Routes = [
  { path: 'users', component:ListUserComponent  },
  { path: 'form-user/:id', component: FormUserComponent },
  { path: 'companys', component:ListCompanyComponent  },
  { path: 'form-company/:id', component: FormCompanyComponent },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
