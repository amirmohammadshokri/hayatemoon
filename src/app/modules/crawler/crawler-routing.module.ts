import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrawlersComponent } from './components/crawlers/crawlers.component';

const routes: Routes = [
  { path: 'list', component: CrawlersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrawlerRoutingModule { }
