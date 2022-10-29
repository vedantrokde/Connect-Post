import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { User } from '../auth/user.model';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';
export const AUTO_AUTH_REQUEST = 'AUTO_AUTH_REQUEST';

export class SignupRequest implements Action {
  readonly type = SIGNUP_REQUEST;
  constructor(
    public payload: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }
  ) {}
}
export class SignupSuccess implements Action {
  readonly type = SIGNUP_SUCCESS;
  constructor(public payload: { message: string; user: User; token: string }) {}
}
export class SignupError implements Action {
  readonly type = SIGNUP_ERROR;
  constructor(public payload: { message: string; error: HttpErrorResponse; }) {}
}
export class LoginRequest implements Action {
  readonly type = LOGIN_REQUEST;
  constructor(public payload: { email: string; password: string }) {}
}
export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: { message: string; user: User; token: string }) {}
}
export class LoginError implements Action {
  readonly type = LOGIN_ERROR;
  constructor(public payload: { message: string; error: HttpErrorResponse; }) {}
}
export class LogoutRequest implements Action {
  readonly type = LOGOUT_REQUEST;
}
export class LogoutSuccess implements Action {
  readonly type = LOGOUT_SUCCESS;
  constructor(public payload: string) {}
}
export class LogoutError implements Action {
  readonly type = LOGOUT_ERROR;
  constructor(public payload: { message: string; error: HttpErrorResponse; }) {}
}
export class AutoAuthRequest implements Action {
  readonly type = AUTO_AUTH_REQUEST;
}
export type AuthActions =
  | SignupRequest
  | SignupSuccess
  | SignupError
  | LoginRequest
  | LoginSuccess
  | LoginError
  | LogoutRequest
  | LogoutSuccess
  | LogoutError
  | AutoAuthRequest;
