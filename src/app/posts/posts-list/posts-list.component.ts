import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { AuthState } from 'src/app/state/auth.reducers';
import {
  DeletePostRequest,
  FetchPostsRequest,
} from 'src/app/state/posts.actions';
import { PostState } from 'src/app/state/posts.reducers';
import { PostsEditComponent } from '../posts-edit/posts-edit.component';
import { Post } from '../posts.model';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  postState!: Observable<PostState>;
  authState!: Observable<AuthState>;
  isLoading = true;
  pageSize = 5;
  pageIndex = 0;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(
      new FetchPostsRequest({
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
      })
    );
    this.postState = this.store.select('posts');
    this.authState = this.store.select('auth');
    this.isLoading = false;
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.pageSize = pageData.pageSize;
    this.pageIndex = pageData.pageIndex;
    this.store.dispatch(
      new FetchPostsRequest({
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
      })
    );
    this.isLoading = false;
  }

  onEdit(post: Post) {
    const dialogRef = this.dialog.open(PostsEditComponent, {
      width: '600px',
      data: {
        edit: true,
        post: post,
      },
    });
  }

  onDelete(post: Post) {
    if (confirm('Do you want to delete ' + post.title + '?') == true) {
      this.isLoading = true;
      this.store.dispatch(new DeletePostRequest(post._id));
    }
    this.isLoading = false;
  }
}
