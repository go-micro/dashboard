import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ClipboardService } from 'ngx-clipboard';
import { finalize } from 'rxjs/operators';
import {
  CallRequest,
  ClientServiceProxy,
  RegistryEndpoint,
  RegistryServiceProxy,
  RegistryServiceSummary,
  RegistryValue
} from 'src/app/shared/service-proxies/service-proxies';

interface RequestPayload {
  [key: string]: any;
}
@Component({
  selector: 'micro-client-call',
  templateUrl: './call.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ClientCallComponent implements OnInit {
  loading = false;
  service: string = '';
  version: string = '';
  endpoint: string = '';
  timeout = 10;
  metadata: any = undefined;
  request: any = undefined;
  response: any = undefined;

  services: RegistryServiceSummary[] = [];
  selectedService: RegistryServiceSummary | undefined = undefined;
  endpoints: RegistryEndpoint[] = [];
  selectedEndpoint: RegistryEndpoint | undefined = undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly clientService: ClientServiceProxy,
    private readonly clipboardService: ClipboardService,
    private readonly messageService: NzMessageService,
    private readonly registryService: RegistryServiceProxy
  ) {}

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
    this.response = undefined;
    this.registryService
      .getServices()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(resp => {
        this.services = resp.services;
        if (!this.service || !resp.services.length) {
          return;
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
    this.response = undefined;
    var input = new CallRequest({
      service: this.service,
      version: this.version,
      endpoint: this.endpoint,
      metadata: JSON.stringify(this.metadata),
      request: JSON.stringify(this.request),
      timeout: this.timeout
    });
    this.clientService
      .call(input)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(resp => {
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
    this.loadEndpointReuqest(endpoint);
  }

  loadEndpointReuqest(endpoint: RegistryEndpoint) {
    var previousRequest = localStorage.getItem(`${endpoint.name}.call`);
    if (previousRequest) {
      try {
        this.request = eval(`(${previousRequest})`);
      } catch (e) {
        // SyntaxError
      }
    } else {
      this.updateRequestPayload(endpoint.request);
    }
  }

  metadataChanged(metadata: string) {
    try {
      this.metadata = eval(`(${metadata})`);
    } catch (e) {
      // SyntaxError
    }
  }

  requestChanged(request: string) {
    try {
      this.request = eval(`(${request})`);
      localStorage.setItem(`${this.endpoint}.call`, JSON.stringify(this.request));
    } catch (e) {
      // SyntaxError
    }
  }

  copyToClipboard(text: string) {
    this.clipboardService.copy(JSON.stringify(text));
    this.messageService.create('success', `Copied to Clipboard`);
  }

  private loadEndpoints() {
    if (!this.service) {
      return;
    }
    this.endpoints = [];
    this.request = undefined;
    this.registryService.getServiceHandlers(this.service, this.version).subscribe(resp => {
      this.endpoints = resp.handlers ? resp.handlers : [];
      if (resp.handlers && resp.handlers.length) {
        if (this.endpoint) {
          resp.handlers?.forEach(e => {
            if (e.name == this.endpoint) {
              this.selectedEndpoint = e;
              this.loadEndpointReuqest(this.selectedEndpoint);
            }
          });
        } else {
          this.selectedEndpoint = this.endpoints[0];
          this.endpoint = this.endpoints[0].name;
          this.loadEndpointReuqest(this.selectedEndpoint);
        }
      }
    });
  }

  private updateRequestPayload(request: RegistryValue) {
    let payload: RequestPayload = {};
    if (request && request.values) {
      request.values.forEach(v => {
        if (!v.name || v.name === 'MessageState' || v.name === 'int32' || v.name === 'unknownFields') {
          return;
        }
        let value: any;
        switch (v.type) {
          case 'string':
            value = '';
            break;
          case 'int':
          case 'int32':
          case 'int64':
          case 'uint':
          case 'uint32':
          case 'uint64':
            value = 0;
            break;
          case 'float64':
          case 'float32':
            value = 0.0;
            break;
          case 'bool':
            value = false;
            break;
          default:
            if (v.type.startsWith('[]')) {
              if (v.type.endsWith('byte') || v.type.endsWith('int8')) {
                value = 'base64';
              } else {
                value = [];
              }
            } else {
              console.log(v.type);
              value = v.type;
            }
        }
        payload[v.name] = value;
      });
    }
    this.request = payload;
  }
}
