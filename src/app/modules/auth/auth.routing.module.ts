import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { MainComponent } from './components/main/main.component';
import { ResetpassComponent } from './components/resetpass/resetpass.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'main' },
      { path: 'main', component: MainComponent },
      { path: 'reset-password', component: ResetpassComponent }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
