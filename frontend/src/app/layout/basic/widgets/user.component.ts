import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { SettingsService, User } from '@delon/theme';

@Component({
  selector: 'header-user',
  template: `
    <div class="alain-default__nav-item d-flex align-items-center px-sm" nz-dropdown nzPlacement="bottomRight" [nzDropdownMenu]="userMenu">
      {{ user.name }}
    </div>
    <nz-dropdown-menu #userMenu="nzDropdownMenu">
      <div nz-menu class="width-sm">
        <div nz-menu-item (click)="about()">
          <i nz-icon nzType="info-circle" class="mr-sm"></i>
          About
        </div>
        <li nz-menu-divider></li>
        <div nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          Logout
        </div>
      </div>
    </nz-dropdown-menu>
    <nz-modal [(nzVisible)]="aboutVisible" nzTitle="About" nzCancelDisabled="true" (nzOnCancel)="aboutVisible=false" (nzOnOk)="aboutVisible=false">
      <ng-container *nzModalContent>
        <p>Version: {{version}}</p>
      </ng-container>
    </nz-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderUserComponent {
  get user(): User {
    return this.settings.user;
  }
  aboutVisible = false;
  version: string = '';

  constructor(private settings: SettingsService, private router: Router, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) { }

  about(): void {
    this.aboutVisible = true;
    this.version = this.settings.getData('version');
  }

  logout(): void {
    this.tokenService.clear();
    this.router.navigateByUrl(this.tokenService.login_url!);
  }
}
