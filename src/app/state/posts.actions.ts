import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Post } from '../posts/posts.model';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_ERROR = 'ADD_POST_ERROR';
export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR';
export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_ERROR = 'DELETE_POST_ERROR';
export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_ERROR = 'UPDATE_POST_ERROR';

export class FetchPostsRequest implements Action {
  readonly type = FETCH_POSTS_REQUEST;
  constructor(public payload: { pageSize: number, pageIndex: number }) {}
}
export class FetchPostsSuccess implements Action {
  readonly type = FETCH_POSTS_SUCCESS;
  constructor(public payload: { message: string; posts: Post[] , count: number}) {}
}
export class FetchPostsError implements Action {
  readonly type = FETCH_POSTS_ERROR;
  constructor(public payload: { message: string; error: HttpErrorResponse; }) {}
}
export class AddPostRequest implements Action {
  readonly type = ADD_POST_REQUEST;
  constructor(public payload: { post: Post; image: File }) {}
}
export class AddPostSuccess implements Action {
  readonly type = ADD_POST_SUCCESS;
  constructor(public payload: { message: string; post: Post }) {}
}
export class AddPostError implements Action {
  readonly type = ADD_POST_ERROR;
  constructor(public payload: { message: string; error: HttpErrorResponse; }) {}
}
export class UpdatePostRequest implements Action {
  readonly type = UPDATE_POST_REQUEST;
  constructor(public payload: { post: Post; image: File }) {}
}
export class UpdatePostSuccess implements Action {
  readonly type = UPDATE_POST_SUCCESS;
  constructor(public payload: { message: string; post: Post }) {}
}
export class UpdatePostError implements Action {
  readonly type = UPDATE_POST_ERROR;
  constructor(public payload: { message: string; error: HttpErrorResponse; }) {}
}
export class DeletePostRequest implements Action {
  readonly type = DELETE_POST_REQUEST;
  constructor(public payload: string) {}
}
export class DeletePostSuccess implements Action {
  readonly type = DELETE_POST_SUCCESS;
  constructor(public payload: { message: string; post: Post }) {}
}
export class DeletePostError implements Action {
  readonly type = DELETE_POST_ERROR;
  constructor(public payload: { message: string; error: HttpErrorResponse; }) {}
}
export type PostActions =
  | AddPostRequest
  | AddPostSuccess
  | FetchPostsRequest
  | FetchPostsSuccess
  | UpdatePostRequest
  | UpdatePostSuccess
  | DeletePostRequest
  | DeletePostSuccess
  | FetchPostsError
  | AddPostError
  | UpdatePostError
  | DeletePostError;