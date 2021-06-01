import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelRoutingModule } from './hotel-routing.module';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';


import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HotelService } from 'src/app/services/hotel.service';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInterceptor } from 'src/app/interceptors/http.interceptor';
import { ErrorInterceptor } from 'src/app/interceptors/error.interceptor';
import { FromHotelComponent } from './components/from-hotel/from-hotel.component';
import { ListHotelComponent } from './components/list-hotel/list-hotel.component';
import { ListRoomkindComponent } from './components/list-roomkind/list-roomkind.component';
import { FormRoomkindComponent } from './components/form-roomkind/form-roomkind.component';
import { FormRoomfacilitieskindComponent } from './components/form-roomfacilitieskind/form-roomfacilitieskind.component';
import { ListRoomfacilitieskindComponent } from './components/list-roomfacilitieskind/list-roomfacilitieskind.component';
import { FormHotelfacilitieskindComponent } from './components/form-hotelfacilitieskind/form-hotelfacilitieskind.component';
import { ListHotelfacilitieskindComponent } from './components/list-hotelfacilitieskind/list-hotelfacilitieskind.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { FormRoomComponent } from './components/form-room/form-room.component';


@NgModule({
  declarations: [FromHotelComponent, ListHotelComponent, ListRoomkindComponent,
    FormRoomkindComponent, FormRoomfacilitieskindComponent, ListRoomfacilitieskindComponent,
    FormHotelfacilitieskindComponent, ListHotelfacilitieskindComponent, FormRoomComponent
  ],
  imports: [
    DynamicDialogModule,
    InputTextareaModule,
    CommonModule,
    HotelRoutingModule,
    TabViewModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    AutoCompleteModule,
    ToolbarModule,
    FormsModule,
    LeafletModule,
    InputTextareaModule,
    ConfirmDialogModule,
    RadioButtonModule,
    DialogModule,
    CheckboxModule,
    TooltipModule
  ],
  providers: [
    HotelService,
    ConfirmationService,
    DialogService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class HotelModule { }
