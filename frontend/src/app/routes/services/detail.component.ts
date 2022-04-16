import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { RegistryService, RegistryServiceProxy } from 'src/app/shared/service-proxies/service-proxies';

@Component({
  selector: 'micro-service',
  templateUrl: './detail.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ServiceDetailComponent implements OnInit {
  loading = false;
  name = '';
  version: string | null = null;
  services: RegistryService[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly registryService: RegistryServiceProxy
  ) {}

  ngOnInit(): void {
    var name = this.route.snapshot.queryParams['name'];
    if (name) {
      this.name = name;
    }
    var version = this.route.snapshot.queryParams['version'];
    if (version) {
      this.version = version;
    }
    this.load();
  }

  load() {
    this.loading = true;
    this.registryService
      .getServiceDetail(this.name, this.version)
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

  gotoCall(service: string, version: string, endpoint: string) {
    let navigationExtras: NavigationExtras = {
      queryParams: { service: service, version: version, endpoint: endpoint }
    };
    this.router.navigate(['/client/call'], navigationExtras);
  }

  gotoPublish(service: string, version: string, topic: string) {
    let navigationExtras: NavigationExtras = {
      queryParams: { service: service, version: version, topic: topic }
    };
    this.router.navigate(['/client/publish'], navigationExtras);
  }
}
