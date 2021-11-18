import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { ClientEndpointCallComponent } from './client/call.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserLoginComponent } from './passport/login/login.component';
import { RouteRoutingModule } from './routes-routing.module';
import { ServiceDetailComponent } from './services/detail.component';
import { ServicesListComponent } from './services/list.component';

const COMPONENTS: Array<Type<void>> = [
  DashboardComponent,
  UserLoginComponent,
  ServicesListComponent,
  ServiceDetailComponent,
  ClientEndpointCallComponent,
];

@NgModule({
  imports: [SharedModule, RouteRoutingModule],
  declarations: COMPONENTS,
})
export class RoutesModule { }
