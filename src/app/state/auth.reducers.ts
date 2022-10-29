import * as AuthActions from './auth.actions';
import { User } from '../auth/user.model';

export interface AuthState {
  user: User;
  token: string;
  message: string;
  isAuthenticated: boolean;
}

const initState: AuthState = {
  user: null,
  token: '',
  message: '',
  isAuthenticated: false,
};

export function authReducers(
  state = initState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: 'Bearer ' + action.payload.token,
        message: action.payload.message,
        isAuthenticated: true,
      };
      break;
    case AuthActions.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: 'Bearer ' + action.payload.token,
        message: action.payload.message,
        isAuthenticated: true,
      };
      break;
    case AuthActions.LOGOUT_SUCCESS:
      return {
        ...initState,
      };
      break;
    case AuthActions.SIGNUP_ERROR:
    case AuthActions.LOGIN_ERROR:
    case AuthActions.LOGOUT_ERROR:
      return {
        ...state,
        message: action.payload.message,
        error: action.payload.error,
      };
      break;
    default:
      return state;
  }
}
