import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserLoginComponent } from './passport/login/login.component';
import { RouteRoutingModule } from './routes-routing.module';
import { ServiceDetailComponent } from './services/detail.component';
import { ServicesListComponent } from './services/list.component';
import { ClientCallComponent } from './client/call.component';
import { ClientPublishComponent } from './client/publish.component';

const COMPONENTS: Array<Type<void>> = [
  DashboardComponent,
  UserLoginComponent,
  ServicesListComponent,
  ServiceDetailComponent,
  ClientCallComponent,
  ClientPublishComponent,
];

@NgModule({
  imports: [SharedModule, RouteRoutingModule],
  declarations: COMPONENTS,
})
export class RoutesModule { }
