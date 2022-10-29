import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { LoginRequest } from 'src/app/state/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  isLoading = true;
  constructor(public dialog: MatDialogRef<SigninComponent>,
    private snackbar: MatSnackBar,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isLoading=false;
  }

  onSignin(form: NgForm) {
    this.isLoading=true;
    this.store.dispatch(new LoginRequest(form.value));
    this.dialog.close();
    this.isLoading=false;
  }
}
