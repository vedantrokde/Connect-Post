import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SigninComponent } from 'src/app/auth/signin/signin.component';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { PostsEditComponent } from 'src/app/posts/posts-edit/posts-edit.component';
import { AppState } from 'src/app/state/app.state';
import { LogoutRequest } from 'src/app/state/auth.actions';
import { AuthState } from 'src/app/state/auth.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  authState: Observable<AuthState>;
  constructor(private dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.authState = this.store.select('auth');
  }

  onCreatePost() {
    this.dialog.open(PostsEditComponent, {
      width: '600px',
      data: {
        edit: false,
        post: null,
      },
    });
  }

  onRegister() {
    this.dialog.open(SignupComponent, {
      width: '600px',
    });
  }

  onLogin() {
    this.dialog.open(SigninComponent, {
      width: '600px',
    });
  }

  onLogout() {
    this.store.dispatch(new LogoutRequest());
  }
}
