import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostingComponent } from './posting/posting.component';
import { PostingsComponent } from './postings/postings.component';
import { ViewReadComponent } from './view-read/view-read.component';

import { SharedModule } from '../shared';
import { routing } from './reader.routing';
import { PostingActionsComponent } from './posting-actions/posting-actions.component';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  declarations: [
    PostingComponent,
    PostingsComponent,
    ViewReadComponent,
    PostingActionsComponent
  ],
  providers: []
})
export class ReaderModule { }
