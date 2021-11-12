import { NgModule } from '@angular/core';

import * as ApiServiceProxies from './service-proxies';

@NgModule({
  providers: [
    ApiServiceProxies.AccountServiceProxy,
    ApiServiceProxies.RegistryServiceProxy,
    ApiServiceProxies.StatisticsServiceProxy,
  ]
})
export class ServiceProxyModule {
}
