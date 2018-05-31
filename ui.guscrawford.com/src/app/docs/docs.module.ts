import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { routing } from './docs.routing';
import { ViewDocsComponent } from './view-docs/view-docs.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  declarations: [ViewDocsComponent],
  exports: [ViewDocsComponent]
})
export class DocsModule { }
