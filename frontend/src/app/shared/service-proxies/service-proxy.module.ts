import { NgModule } from '@angular/core';

import * as ApiServiceProxies from './service-proxies';

@NgModule({
  providers: [
    ApiServiceProxies.AccountServiceProxy,
    ApiServiceProxies.ClientServiceProxy,
    ApiServiceProxies.RegistryServiceProxy,
    ApiServiceProxies.StatisticsServiceProxy,
    ApiServiceProxies.ServiceProxy,
  ]
})
export class ServiceProxyModule {
}
