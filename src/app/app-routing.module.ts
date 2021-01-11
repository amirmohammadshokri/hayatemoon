import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'ads', loadChildren: () => import('./modules/ads/ads.module').then(m => m.AdsModule) },
  { path: 'panel', loadChildren: () => import('./modules/panel/panel.module').then(m => m.PanelModule) },
  { path: 'landing', loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule) },
  { path: 'posting', loadChildren: () => import('./modules/posting/posting.module').then(m => m.PostingModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
