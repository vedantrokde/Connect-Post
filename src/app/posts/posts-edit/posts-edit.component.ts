import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { AddPostRequest, UpdatePostRequest } from 'src/app/state/posts.actions';
import { Post } from '../posts.model';

@Component({
  selector: 'app-posts-edit',
  templateUrl: './posts-edit.component.html',
  styleUrls: ['./posts-edit.component.css'],
})
export class PostsEditComponent implements OnInit {
  isLoading = true;
  form: FormGroup;
  imagePreview: string;

  constructor(
    public dialog: MatDialogRef<PostsEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { edit: boolean; post: Post },
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl('', { validators: [Validators.required] }),
      image: new FormControl(null),
    });
    if (this.data.edit) {
      this.form.patchValue({
        title: this.data.post.title,
        content: this.data.post.content,
      });
    }
    this.isLoading = false;
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      image: file,
    });

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.form.invalid) return;

    this.isLoading = true;

    if (this.data.edit) {
      this.store.dispatch(
        new UpdatePostRequest({
          post: {
            _id: this.data.post._id,
            title: this.form.value.title,
            content: this.form.value.content,
            imagePath: this.data.post.imagePath,
          },
          image: this.form.value.image,
        })
      );
    } else {
      this.store.dispatch(
        new AddPostRequest({
          post: {
            _id: null,
            title: this.form.value.title,
            content: this.form.value.content,
            imagePath: null,
          },
          image: this.form.value.image,
        })
      );
    }
    this.form.reset();
    this.dialog.close();
  }
}
