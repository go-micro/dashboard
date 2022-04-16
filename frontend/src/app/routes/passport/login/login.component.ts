import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Optional } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StartupService } from '@core';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { DA_SERVICE_TOKEN, ITokenService, SocialService } from '@delon/auth';
import { NzTabChangeEvent } from 'ng-zorro-antd/tabs';
import { finalize } from 'rxjs/operators';
import { AccountServiceProxy, LoginRequest } from 'src/app/shared/service-proxies/service-proxies';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserLoginComponent {
  constructor(
    fb: FormBuilder,
    private router: Router,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    private cdr: ChangeDetectorRef,
    private accountService: AccountServiceProxy
  ) {
    this.form = fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  // #region fields

  get username(): AbstractControl {
    return this.form.controls.username;
  }
  get password(): AbstractControl {
    return this.form.controls.password;
  }
  form: FormGroup;
  error = '';
  type = 0;
  loading = false;

  // #region get captcha

  count = 0;

  // #endregion

  switch({ index }: NzTabChangeEvent): void {
    this.type = index!;
  }

  // #endregion

  submit(): void {
    this.error = '';
    if (this.type === 0) {
      this.username.markAsDirty();
      this.username.updateValueAndValidity();
      this.password.markAsDirty();
      this.password.updateValueAndValidity();
      if (this.username.invalid || this.password.invalid) {
        return;
      }
    }

    this.loading = true;
    this.cdr.detectChanges();
    this.accountService
      .login(new LoginRequest({ username: this.username.value, password: this.password.value }))
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(resp => {
        if (!resp.token) {
          this.error = 'login failed';
          this.cdr.detectChanges();
          return;
        }
        this.reuseTabService.clear();
        this.tokenService.set({ token: resp.token });
        this.startupSrv.load().subscribe(() => {
          let url = this.tokenService.referrer!.url || '/';
          if (url.includes('/passport')) {
            url = '/';
          }
          this.router.navigateByUrl(url);
        });
      });
  }
}
