import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { RegistryService, RegistryServiceProxy } from 'src/app/shared/service-proxies/service-proxies';

@Component({
  selector: 'micro-service',
  templateUrl: './detail.component.html',
  // styleUrls: ['./service.component.less'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ServiceDetailComponent implements OnInit {
  loading = false;
  name = '';
  version: string | null = null;
  services: RegistryService[] = [];

  constructor(private readonly route: ActivatedRoute,
    private readonly registryService: RegistryServiceProxy,) {
  }

  ngOnInit(): void {
    // console.log(this.route.snapshot.queryParams['name']);
    // console.log(this.route.snapshot.queryParams['version']);
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
    this.registryService.getServiceDetail(this.name, this.version).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe(resp => {
      if (resp.services) {
        this.services = resp.services;
      }
    });
  }

  goBack() {
    history.go(-1);
  }
}
