import { ActionReducerMap } from '@ngrx/store';
import { authReducers, AuthState } from './auth.reducers';
import { postReducers, PostState } from './posts.reducers';

export interface AppState {
  auth: AuthState;
  posts: PostState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducers,
  posts: postReducers,
};