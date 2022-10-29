import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from './core/core.module';
import { PostsModule } from './posts/posts.module';
import { reducers } from './state/app.state';
import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from './state/posts.effects';
import { AuthModule } from './auth/auth.module';
import { AuthEffects } from './state/auth.effects';
import { AuthInterceptor } from './auth/auth.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    AuthModule,
    CoreModule,
    PostsModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
    EffectsModule.forRoot([PostEffects, AuthEffects]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
