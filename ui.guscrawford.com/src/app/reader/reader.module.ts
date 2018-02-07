import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostingComponent } from './posting/posting.component';
import { ViewReadComponent } from './view-read/view-read.component';

import { SharedModule } from '../shared/shared.module';
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
    ViewReadComponent,
    PostingActionsComponent
  ],
  providers: []
})
export class ReaderModule { }
