import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponseBase
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ALAIN_I18N_TOKEN, _HttpClient } from '@delon/theme';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap, } from 'rxjs/operators';

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {
  }

  private get notification(): NzNotificationService {
    return this.injector.get(NzNotificationService);
  }

  private goTo(url: string): void {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private handleData(ev: HttpResponseBase, req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    switch (ev.status) {
      case 200:
        break;
      case 401:
        this.notification.error(`Login`, `Not logged in or login expired, please log in again`);
        this.goTo('/passport/login');
        break;
      case 403:
      case 404:
        this.goTo(`/exception/${ev.status}`);
        break;
      default:
        console.log(ev);
        if (ev instanceof HttpErrorResponse) {
          this.blobToText(ev.error).subscribe((resp) => {
            var msg = resp ? resp : ev.statusText;
            this.notification.error('Error', `${ev.status}: ${ev.url} ${msg}`, { nzDuration: 5000 });
          });
          return throwError(ev);
        }
        break;
    }
    if (ev instanceof HttpErrorResponse) {
      return throwError(ev);
    } else {
      return of(ev);
    }
  }

  private getAdditionalHeaders(headers?: HttpHeaders): { [name: string]: string } {
    const res: { [name: string]: string } = {};
    const lang = this.injector.get(ALAIN_I18N_TOKEN).currentLang;
    if (!headers?.has('Accept-Language') && lang) {
      res['Accept-Language'] = lang;
    }
    const token = this.injector.get<ITokenService>(DA_SERVICE_TOKEN).get()?.token
    if (token) {
      res['Authorization'] = 'Bearer ' + token;
    }
    return res;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone({ url: req.url, setHeaders: this.getAdditionalHeaders(req.headers) });
    return next.handle(newReq).pipe(
      mergeMap(ev => {
        if (ev instanceof HttpResponseBase) {
          return this.handleData(ev, newReq, next);
        }
        return of(ev);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err, newReq, next))
    );
  }

  blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
      if (blob instanceof Blob) {
        let reader = new FileReader();
        reader.onload = (event) => {
          observer.next((<any>event.target).result);
          observer.complete();
        };
        reader.readAsText(blob);
      } else {
        observer.next(blob && blob.error ? blob.error : JSON.stringify(blob));
        observer.complete();
      }
    });
  }
}
