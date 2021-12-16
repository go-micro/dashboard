import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleGuard } from '@delon/auth';
import { environment } from '@env/environment';
// layout
import { LayoutBasicComponent } from '../layout/basic/basic.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
import { ClientCallComponent } from './client/call.component';
import { ClientPublishComponent } from './client/publish.component';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { ServicesListComponent } from './services/list.component';
import { ServiceDetailComponent } from './services/detail.component';
import { ServiceNodesComponent } from './services/nodes.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutBasicComponent,
    canActivate: [SimpleGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard', titleI18n: 'dashboard' } },
      { path: 'services', component: ServicesListComponent, data: { title: 'Services', titleI18n: 'services' } },
      { path: 'service/detail', component: ServiceDetailComponent },
      { path: 'service/nodes', component: ServiceNodesComponent },
      { path: 'client/call', component: ClientCallComponent, data: { title: 'Call', titleI18n: 'call' } },
      { path: 'client/publish', component: ClientPublishComponent, data: { title: 'Call', titleI18n: 'call' } },
      { path: 'exception', loadChildren: () => import('./exception/exception.module').then(m => m.ExceptionModule) },
    ]
  },
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      { path: 'login', component: UserLoginComponent, data: { title: 'Login', titleI18n: 'login' } },
    ]
  },
  { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, {
      useHash: environment.useHash,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top',
    }
    )],
  exports: [RouterModule],
})
export class RouteRoutingModule { }
