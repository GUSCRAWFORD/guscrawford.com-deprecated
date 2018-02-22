import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostingComponent } from './reader/posting/posting.component';
import { ViewReadComponent } from './reader/view-read/view-read.component';


import { SharedModule } from '../shared/shared.module';
import { routing } from './post.routing';

import { PostingActionsComponent } from './reader/posting-actions/posting-actions.component';
import { ViewPostingComponent } from './reader/view-posting/view-posting.component';


import { ViewEditComponent } from './editor/view-edit/view-edit.component';
import { EditPostComponent } from './editor/edit-post/edit-post.component';
import { ViewPostComponent } from './editor/view-post/view-post.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    routing
  ],
  declarations: [
    PostingComponent,
    ViewReadComponent,
    PostingActionsComponent,
    ViewPostingComponent,


    ViewEditComponent,
    ViewPostComponent,
    EditPostComponent
  ],
  providers: [],
  exports: [
    PostingComponent,
    ViewReadComponent,
    PostingActionsComponent,
    ViewPostingComponent
  ]
})
export class PostModule { }
