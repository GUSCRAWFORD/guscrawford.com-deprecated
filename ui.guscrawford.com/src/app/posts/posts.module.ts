import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostingComponent } from './feed/posting/posting.component';
import { ViewFeedComponent } from './feed/view-feed/view-feed.component';


import { SharedModule } from '../shared/shared.module';
import { routing } from './posts.routing';

import { PostingActionsComponent } from './feed/posting-actions/posting-actions.component';
import { ViewPostingComponent } from './feed/view-posting/view-posting.component';


import { ViewEditComponent } from './editor/view-edit/view-edit.component';
import { EditPostComponent } from './editor/edit-post/edit-post.component';

import { ViewPostComponent } from './post/view-post/view-post.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  declarations: [
    PostingComponent,
    ViewFeedComponent,
    PostingActionsComponent,
    ViewPostingComponent,


    ViewEditComponent,
    ViewPostComponent,
    EditPostComponent
  ],
  providers: [],
  exports: [
    PostingComponent,
    ViewFeedComponent,
    PostingActionsComponent,
    ViewPostingComponent
  ]
})
export class PostsModule { }
