import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../posting/components/main/main.component';
import { PostAdverComponent } from './components/post-adver/post-adver.component';



export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  { path: 'main', component: MainComponent },
  { path: 'postadver', component: PostAdverComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class postingroutingModule { }
