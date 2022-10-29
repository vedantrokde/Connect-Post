import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { AutoAuthRequest } from './state/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'connect-post';

  constructor(private store: Store<AppState>){}

  ngOnInit(): void {
    this.store.dispatch(new AutoAuthRequest());
  }
}
