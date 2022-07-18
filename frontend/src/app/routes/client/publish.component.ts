import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ClipboardService } from 'ngx-clipboard';
import { finalize } from 'rxjs/operators';
import {
  ClientServiceProxy,
  PublishRequest,
  RegistryEndpoint,
  RegistryServiceProxy,
  RegistryServiceSummary,
  RegistryValue
} from 'src/app/shared/service-proxies/service-proxies';

interface RequestPayload {
  [key: string]: any;
}
@Component({
  selector: 'micro-client-publish',
  templateUrl: './publish.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ClientPublishComponent implements OnInit {
  loading = false;
  service: string = '';
  version: string = '';
  topic: string = '';
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
    var topic = this.route.snapshot.queryParams['topic'];
    if (topic) {
      this.topic = topic;
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

  publish() {
    this.loading = true;
    this.response = undefined;
    var input = new PublishRequest({
      topic: this.topic,
      metadata: JSON.stringify(this.metadata),
      message: JSON.stringify(this.request)
    });
    this.clientService
      .publish(input)
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
    this.topic = '';
    this.selectedEndpoint = undefined;
    this.loadEndpoints();
  }

  versionChanged(version: string) {
    this.version = version;
    this.loadEndpoints();
  }

  endpointChanged(endpoint: RegistryEndpoint) {
    this.topic = endpoint.name;
    this.loadEndpointReuqest(endpoint);
  }

  loadEndpointReuqest(endpoint: RegistryEndpoint) {
    var previousRequest = localStorage.getItem(`${endpoint.name}.publish`);
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
      localStorage.setItem(`${this.topic}.publish`, JSON.stringify(this.request));
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
    this.registryService.getServiceSubscribers(this.service, this.version).subscribe(resp => {
      this.endpoints = resp.subscribers ? resp.subscribers : [];
      if (resp.subscribers && resp.subscribers.length) {
        if (this.topic) {
          resp.subscribers?.forEach(e => {
            if (e.name == this.topic) {
              this.selectedEndpoint = e;
              this.loadEndpointReuqest(this.selectedEndpoint);
            }
          });
        } else {
          this.selectedEndpoint = this.endpoints[0];
          this.topic = this.endpoints[0].name;
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
              value = [];
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
