import { Injectable } from '@angular/core';
import { ACLService } from '@delon/acl';
import { MenuService, SettingsService, TitleService } from '@delon/theme';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzIconService } from 'ng-zorro-antd/icon';
import { Observable, zip, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AccountServiceProxy, ServiceProxy } from 'src/app/shared/service-proxies/service-proxies';

import { ICONS } from '../../../style-icons';
import { ICONS_AUTO } from '../../../style-icons-auto';

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    private accountService: AccountServiceProxy,
    private readonly serviceProxy: ServiceProxy
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  load(): Observable<void> {
    const app: any = {
      name: `Go Micro`,
      description: `go-micro dashboard`
    };
    // Application information: including site name, description, year
    this.settingService.setApp(app);
    // ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
    this.aclService.setFull(true);
    // Menu data, https://ng-alain.com/theme/menu
    this.menuService.add([
      {
        text: 'Main',
        group: true,
        children: [
          {
            text: 'Dashboard',
            link: '/dashboard',
            icon: { type: 'icon', value: 'dashboard' }
          }
        ]
      },
      {
        text: 'Services',
        group: true,
        children: [
          {
            text: 'Services',
            link: '/services',
            icon: { type: 'icon', value: 'cloud' }
          },
          {
            text: 'Nodes',
            link: '/service/nodes',
            icon: { type: 'icon', value: 'apartment' }
          }
        ]
      },
      {
        text: 'Client',
        group: true,
        children: [
          {
            text: 'Call',
            link: '/client/call',
            icon: { type: 'icon', value: 'api' }
          },
          {
            text: 'Publish',
            link: '/client/publish',
            icon: { type: 'icon', value: 'sound' }
          }
        ]
      }
    ]);
    this.serviceProxy.getVersion().subscribe(resp => {
      this.settingService.setData('version', resp.version);
    });
    // Can be set page suffix title, https://ng-alain.com/theme/title
    this.titleService.suffix = app.name;
    return this.accountService.profile().pipe(
      catchError((res: NzSafeAny) => {
        console.warn(`StartupService.load: Network request failed`, res);
        return of({ name: 'admin' });
      }),
      map(resp => {
        // User information: including name, avatar, email address
        this.settingService.setUser({ name: resp.name });
      })
    );
  }
}
