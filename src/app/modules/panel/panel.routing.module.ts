import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path: 'hotel',
        loadChildren: () => import('../hotel/hotel.module').then(a => a.HotelModule)
      },
      {
        path: 'residence',
        loadChildren: () => import('../residence/residence.module').then(m => m.ResidenceModule)
      },
      {
        path: 'tour',
        loadChildren: () => import('../tour/tour.module').then(m => m.TourModule)
      },
      {
        path: 'places',
        loadChildren: () => import('../places/places.module').then(m => m.PlacesModule)
      },
      {
        path: 'ticket',
        loadChildren: () => import('../ticketing/ticketing.module').then(m => m.TicketingModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
