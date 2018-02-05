import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ViewEditComponent } from './view-edit/view-edit.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { ViewPostComponent } from './view-post/view-post.component';

import {
  routing
} from './editor.routing';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    ViewEditComponent,
    ViewPostComponent,
    EditPostComponent
  ]
})
export class EditorModule { }