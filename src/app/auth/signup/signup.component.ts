import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { SignupRequest } from 'src/app/state/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading = true;

  constructor(public dialog: MatDialogRef<SignupComponent>,
    private snackbar: MatSnackBar,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isLoading=false;
  }

  onSignup(form: NgForm){
    this.isLoading=true;
    this.store.dispatch(new SignupRequest(form.value));
    this.dialog.close();
    this.isLoading=false;
  }

}
