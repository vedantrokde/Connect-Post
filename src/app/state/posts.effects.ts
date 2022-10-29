import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../posts/posts.model';
import * as PostActions from './posts.actions';

const BASE_URL = environment.API_URL + 'posts/';

@Injectable()
export class PostEffects {
  fetch$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.FETCH_POSTS_REQUEST),
      map((action: PostActions.FetchPostsRequest) => {
        return action.payload;
      }),
      switchMap((data) => {
        return this.httpClient.get<{
          message: string;
          posts: Post[];
          count: number;
        }>(BASE_URL, {
          params: { pageSize: data.pageSize, pageIndex: data.pageIndex },
        });
      }),
      map((response) => {
        this.notify('Fetched posts successfully');
        return {
          type: PostActions.FETCH_POSTS_SUCCESS,
          payload: {
            posts: response.posts,
            message: response.message,
            count: response.count,
          },
        };
      }),
      catchError((error) => {
        this.notify('Failed to fetch posts');
        return of({
          type: PostActions.FETCH_POSTS_ERROR,
          payload: {
            message: error.error.message,
            error: error,
          },
        });
      })
    );
  });

  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.ADD_POST_REQUEST),
      map((action: PostActions.AddPostRequest) => {
        return action.payload;
      }),
      switchMap((data) => {
        const formData = new FormData();
        formData.append('title', data.post.title);
        formData.append('content', data.post.content);

        if (data.image !== null) {
          formData.append('image', data.image, data.post.title);
        }

        return this.httpClient.post<{ message: string; post: Post }>(
          BASE_URL,
          formData
        );
      }),
      map((response) => {
        this.notify('Created post successfully');
        return {
          type: PostActions.ADD_POST_SUCCESS,
          payload: {
            post: response.post,
            message: response.message,
          },
        };
      }),
      catchError((error) => {
        this.notify('Failed to create post');
        return of({
          type: PostActions.ADD_POST_ERROR,
          payload: {
            message: error.error.message,
            error: error,
          },
        });
      })
    );
  });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.UPDATE_POST_REQUEST),
      map((action: PostActions.UpdatePostRequest) => {
        return action.payload;
      }),
      switchMap((data) => {
        const formData = new FormData();
        formData.append('_id', data.post._id);
        formData.append('title', data.post.title);
        formData.append('content', data.post.content);
        formData.append('imagePath', data.post.imagePath);

        if (data.image !== null) {
          formData.append('image', data.image, data.post.title);
        }

        return this.httpClient.put<{ message: string; post: Post }>(
          BASE_URL,
          formData
        );
      }),
      map((response) => {
        this.notify('Updated post successfully');
        return {
          type: PostActions.UPDATE_POST_SUCCESS,
          payload: {
            post: response.post,
            message: response.message,
          },
        };
      }),
      catchError((error) => {
        this.notify('Failed to update post');
        return of({
          type: PostActions.UPDATE_POST_ERROR,
          payload: {
            message: error.error.message,
            error: error,
          },
        });
      })
    );
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.DELETE_POST_REQUEST),
      map((action: PostActions.DeletePostRequest) => {
        return action.payload;
      }),
      switchMap((id) => {
        return this.httpClient.delete<{ message: string; post: Post }>(
          BASE_URL + id
        );
      }),
      map((response) => {
        this.notify('Deleted post successfully');
        return {
          type: PostActions.DELETE_POST_SUCCESS,
          payload: {
            post: response.post,
            message: response.message,
          },
        };
      }),
      catchError((error) => {
        this.notify('Failed to delete post');
        return of({
          type: PostActions.DELETE_POST_ERROR,
          payload: {
            message: error.error.message,
            error: error,
          },
        });
      })
    );
  });

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private snackbar: MatSnackBar
  ) {}

  private notify(message: string) {
    this.snackbar.open(message, 'DISMISS', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: 7000,
    });
  }
}
