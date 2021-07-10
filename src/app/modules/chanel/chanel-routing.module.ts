import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChanelContentsComponent } from './components/chanel-contents/chanel-contents.component';
import { FormChanelComponent } from './components/form-chanel/form-chanel.component';
import { ListChanelComponent } from './components/list-chanel/list-chanel.component';

const routes: Routes = [
  { path: 'chanels', component: ListChanelComponent },
  { path: 'chanel/:id', component: FormChanelComponent },
  { path: 'contents/:chanelId', component: ChanelContentsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChanelRoutingModule { }
