import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { RegistryServiceSummary, RegistryServiceProxy } from 'src/app/shared/service-proxies/service-proxies';

@Component({
  selector: 'micro-services',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ServicesListComponent implements OnInit {
  loading: boolean = false;
  services: RegistryServiceSummary[] = [];

  constructor(private readonly router: Router, private registryService: RegistryServiceProxy) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.registryService
      .getServices()
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

  gotoServiceDetail(name: any, version: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: { name: name, version: version }
    };
    this.router.navigate(['/service/detail'], navigationExtras);
  }
}
