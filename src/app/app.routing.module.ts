import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'panel' },
  { path: 'panel', loadChildren: () => import('./modules/panel/panel.module').then(m => m.PanelModule) },
  { path: 'pages', loadChildren: () => import('./modules/pages/pages.module').then(m => m.PagesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
