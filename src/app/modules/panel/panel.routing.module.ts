import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path: 'hotel',
        loadChildren: () => import('../hotel/hotel.module').then(a=>a.HotelModule)
      }, {
        path: 'tour',
        loadChildren: () => import('../tour/tour.module').then(m => m.TourModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
