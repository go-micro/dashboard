import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { StatisticsServiceProxy } from 'src/app/shared/service-proxies/service-proxies';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DashboardComponent implements OnInit {
  loading: boolean;
  registryType: string;
  registryAddrs: string[];
  servicesCount: number;
  nodesCount: number;

  constructor(private readonly router: Router, private statisticsService: StatisticsServiceProxy) {
    this.loading = false;
    this.registryType = '';
    this.registryAddrs = [];
    this.servicesCount = 0;
    this.nodesCount = 0;
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.statisticsService
      .getSummary()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(resp => {
        if (resp.registry) {
          if (resp.registry.type) {
            this.registryType = resp.registry.type;
          }
          if (resp.registry.addrs) {
            this.registryAddrs = resp.registry.addrs;
          }
        }
        if (resp.services) {
          if (resp.services.count) {
            this.servicesCount = resp.services.count;
          }
          if (resp.services.nodes_count) {
            this.nodesCount = resp.services.nodes_count;
          }
        }
      });
  }

  goto(url: string) {
    this.router.navigateByUrl(url);
  }
}
