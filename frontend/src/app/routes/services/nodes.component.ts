import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ClientServiceProxy, HealthCheckRequest, RegistryServiceProxy } from 'src/app/shared/service-proxies/service-proxies';

@Component({
  selector: 'micro-nodes',
  templateUrl: './nodes.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ServiceNodesComponent implements OnInit {
  loading = false;
  name = '';
  version: string | null = null;
  services: any;

  constructor(private readonly registryService: RegistryServiceProxy, private readonly clientService: ClientServiceProxy) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.registryService
      .getNodes()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(resp => {
        if (resp.services) {
          this.services = resp.services;
        }
      });
  }

  healthCheck(service: any, data: any) {
    data.loading = true;
    var input = new HealthCheckRequest({
      service: service,
      address: data.address,
      version: data.version
    });
    this.clientService
      .healthCheck(input)
      .pipe(
        finalize(() => {
          data.loading = false;
        })
      )
      .subscribe(resp => {
        if (resp && resp.success) {
          data.valid = true;
          data.tip = `Status: ${resp.status}`;
        } else {
          console.log(resp);
          data.valid = false;
          if (resp.error) {
            data.tip = resp.error.detail ? resp.error.detail : JSON.stringify(resp.error);
          }
        }
      });
  }
}
