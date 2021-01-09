import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcreditComponent } from './components/addcredit/addcredit.component';
import { MarkedadsComponent } from './components/markedads/markedads.component';
import { MyAdsComponent } from './components/my-ads/my-ads.component';
import { PanelComponent } from './components/panel/panel.component';
import { SecurityComponent } from './components/security/security.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'myads' },
      { path: 'myads', component: MyAdsComponent },
      { path: 'addcredit', component: AddcreditComponent },
      { path: 'markedads', component: MarkedadsComponent },
      { path: 'profile', component: UserprofileComponent },
      { path: 'security', component: SecurityComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
