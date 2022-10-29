import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, switchMap, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { AuthState } from '../state/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const skipIntercept = req.headers.has('skip');

    if (skipIntercept) {
      const skipReq = req.clone({
        headers: req.headers.delete('skip'),
      });
      return next.handle(skipReq);
    } else {
      return this.store.select('auth').pipe(
        take(1),
        switchMap((authState: AuthState) => {
          const authReq = req.clone({
            headers: req.headers.set('Authorization', authState.token),
          });
          return next.handle(authReq);
        })
      );
    }
  }
}
