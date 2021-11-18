import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { CallRequest, ClientServiceProxy, RegistryEndpoint, RegistryServiceProxy, RegistryServiceSummary, RegistryValue } from 'src/app/shared/service-proxies/service-proxies';

interface RequestPayload {
  [key: string]: any
}
@Component({
  selector: 'micro-client-call',
  templateUrl: './call.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ClientEndpointCallComponent implements OnInit {
  loading = false;
  service: string = '';
  version: string = '';
  endpoint: string = '';
  timeout = 10;
  request: any = undefined;
  response: any = {};

  services: RegistryServiceSummary[] = [];
  selectedService: RegistryServiceSummary | undefined = undefined;
  endpoints: RegistryEndpoint[] = [];
  selectedEndpoint: RegistryEndpoint | undefined = undefined;

  constructor(private readonly route: ActivatedRoute,
    private readonly clientService: ClientServiceProxy,
    private readonly registryService: RegistryServiceProxy,
  ) {
  }

  ngOnInit(): void {
    var service = this.route.snapshot.queryParams['service'];
    if (service) {
      this.service = service;
    }
    var version = this.route.snapshot.queryParams['version'];
    if (version) {
      this.version = version;
    }
    var endpoint = this.route.snapshot.queryParams['endpoint'];
    if (endpoint) {
      this.endpoint = endpoint;
    }
    this.load();
  }

  load() {
    this.loading = true;
    this.selectedEndpoint = undefined;
    this.services = [];
    this.registryService.getServices().pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe(resp => {
      this.services = resp.services;
      if (!this.service || !resp.services.length) {
        return
      }
      resp.services.forEach(s => {
        if (s.name == this.service) {
          this.selectedService = s;
          if (!this.version) {
            this.version = s.versions ? s.versions[0] : '';
          }
        }
      });
      this.loadEndpoints();
    });
  }

  call() {
    this.loading = true;
    var input = new CallRequest({
      service: this.service,
      version: this.version,
      endpoint: this.endpoint,
      request: JSON.stringify(this.request),
      timeout: this.timeout,
    });
    this.clientService.callEndpoint(input).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe(resp => {
      this.response = resp;
    });
  }

  serviceChanged(service: RegistryServiceSummary) {
    this.service = service.name;
    if (service.versions && service.versions.length) {
      this.version = service.versions[0];
    }
    this.endpoint = '';
    this.selectedEndpoint = undefined;
    this.loadEndpoints();
  }

  versionChanged(version: string) {
    this.version = version;
    this.loadEndpoints();
  }

  endpointChanged(endpoint: RegistryEndpoint) {
    this.endpoint = endpoint.name;
    this.updateRequestPayload(endpoint.request);
  }

  requestChanged(request: string) {
    this.request = eval('(' + request + ')');
  }

  private loadEndpoints() {
    if (!this.service) {
      return
    }
    this.endpoints = [];
    this.registryService.getServiceEndpoints(this.service, this.version).subscribe(resp => {
      this.endpoints = resp.endpoints ? resp.endpoints : [];
      if (resp.endpoints && resp.endpoints.length) {
        if (this.endpoint) {
          resp.endpoints?.forEach(e => {
            if (e.name == this.endpoint) {
              this.selectedEndpoint = e;
              this.updateRequestPayload(e.request);
            }
          });
        } else {
          this.selectedEndpoint = this.endpoints[0];
          this.endpoint = this.endpoints[0].name;
          this.updateRequestPayload(this.endpoints[0].request);
        }
      }
    });
  }

  private updateRequestPayload(request: RegistryValue) {
    let payload: RequestPayload = {};
    if (request && request.values) {
      request.values.forEach(v => {
        if (!v.name || v.name === 'MessageState' || v.name === 'int32' || v.name === 'unknownFields') {
          return
        }
        let value: any;
        switch (v.type) {
          case "string":
            value = '';
            break;
          case "int":
          case "int32":
          case "int64":
          case "uint":
          case "uint32":
          case "uint64":
            value = 0;
            break;
          case 'bool':
            value = false;
            break;
          default:
            console.log(v.type);
            value = v.type;
        }
        payload[v.name] = value;
      })
    }
    this.request = payload;
  }
}