import { Component, Inject, OnInit } from '@angular/core';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ServiceProxy } from 'src/app/shared/service-proxies/service-proxies';

@Component({
  selector: 'layout-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.less']
})
export class LayoutPassportComponent implements OnInit {
  constructor(@Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService, private readonly service: ServiceProxy) {}

  version: string = '';

  ngOnInit(): void {
    this.tokenService.clear();
    this.service.getVersion().subscribe(resp => {
      this.version = resp.version;
    });
  }
}
