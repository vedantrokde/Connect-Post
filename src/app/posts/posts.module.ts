import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsListComponent } from './posts-list/posts-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'
import { MatExpansionModule } from "@angular/material/expansion";
import {MatDialogModule} from '@angular/material/dialog';
import { PostsEditComponent } from './posts-edit/posts-edit.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    PostsListComponent,
    PostsEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  exports: [
    PostsListComponent,
  ]
})
export class PostsModule { }
