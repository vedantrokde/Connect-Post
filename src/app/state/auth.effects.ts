import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../auth/user.model';
import { AppState } from './app.state';
import * as AuthActions from './auth.actions';

const BASE_URL = environment.API_URL + 'user/'

@Injectable()
export class AuthEffects {
  tokenTimer!: any;

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.SIGNUP_REQUEST),
      map((action: AuthActions.SignupRequest) => {
        return action.payload;
      }),
      switchMap((data) => {
        return this.httpClient.post<{
          message: string;
          token: string;
          expiresIn: number;
          user: User;
        }>(BASE_URL + 'signup', data);
      }),
      map((response) => {
        const now = new Date();
        const expiration = new Date(now.getTime() + response.expiresIn);
        this.tokenTimer = this.setAuthTimer(response.expiresIn);
        this.saveAuthData(response.token, expiration);

        this.notify("Registered user successfully");
        return {
          type: AuthActions.SIGNUP_SUCCESS,
          payload: {
            message: response.message,
            token: response.token,
            user: response.user,
          },
        };
      }),
      catchError((error) => {
        this.notify("Failed to register user");
        return of({
          type: AuthActions.SIGNUP_ERROR,
          payload: {
            message: error.error.message,
            error: error
          },
        });
      })
    );
  });

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.LOGIN_REQUEST),
      map((action: AuthActions.LoginRequest) => {
        return action.payload;
      }),
      switchMap((data) => {
        return this.httpClient.post<{
          message: string;
          token: string;
          expiresIn: number;
          user: User;
        }>(BASE_URL + 'signin', data);
      }),
      map((response) => {
        const now = new Date();
        const expiration = new Date(now.getTime() + response.expiresIn);
        this.tokenTimer = this.setAuthTimer(response.expiresIn);
        this.saveAuthData(response.token, expiration);

        this.notify("Logged in successfully");
        return {
          type: AuthActions.LOGIN_SUCCESS,
          payload: {
            message: response.message,
            token: response.token,
            user: response.user,
          },
        };
      }),
      catchError((error) => {
        this.notify("Logged in failed");
        return of({
          type: AuthActions.LOGIN_ERROR,
          payload: {
            message: error.error.message,
            error: error
          },
        });
      })
    );
  });

  autoAuth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.AUTO_AUTH_REQUEST),
      map((action: AuthActions.AutoAuthRequest) => {
        return action;
      }),
      switchMap(() => {
        var token = '';
        const now = new Date();
        const authInfo = this.getAuthData();

        if (authInfo !== null) {
          const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
          if (expiresIn > 0) {
            token = authInfo.token;
          }
        }

        return this.httpClient.get<{
          message: string;
          token: string;
          expiresIn: number;
          user: User;
        }>(BASE_URL + 'auth', {
          headers: {
            Authorization: 'Bearer ' + token,
            skip: 'true',
          },
        });
      }),
      map((response) => {
        const now = new Date();
        const expiration = new Date(now.getTime() + response.expiresIn);
        this.tokenTimer = this.setAuthTimer(response.expiresIn);
        this.saveAuthData(response.token, expiration);

        this.notify("Logged in successfully");
        return {
          type: AuthActions.LOGIN_SUCCESS,
          payload: {
            message: response.message,
            token: response.token,
            user: response.user,
          },
        };
      })
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.LOGOUT_REQUEST),
      map((action: AuthActions.LogoutRequest) => {
        return action;
      }),
      switchMap(() => {
        return this.httpClient.get<{ message: string }>(
          BASE_URL + 'signout'
        );
      }),
      map((response) => {
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.notify("Logged out successfully");
        return {
          type: AuthActions.LOGOUT_SUCCESS,
          payload: response.message,
        };
      }),
      catchError((error) => {
        this.notify("Failed to logout");
        return of({
          type: AuthActions.LOGOUT_ERROR,
          payload: {
            message: error.error.message,
            error: error
          },
        });
      })
    );
  });

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<AppState>,
    private snackbar: MatSnackBar
  ) {}

  private setAuthTimer(duration: number) {
    return setTimeout(() => {
      this.store.dispatch(new AuthActions.LogoutRequest());
    }, duration);
  }

  private saveAuthData(token: string, expiresIn: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiresIn.toISOString());
  }
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expiresIn = localStorage.getItem('expiration');

    if (!token || !expiresIn) return null;

    return {
      token: token,
      expirationDate: new Date(expiresIn),
    };
  }
  private notify(message: string) {
    this.snackbar.open(message, 'DISMISS', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: 7000,
    });
  }
}
