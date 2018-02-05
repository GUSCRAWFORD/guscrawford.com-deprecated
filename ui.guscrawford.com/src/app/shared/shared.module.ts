import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { UiService } from './ui/ui.service';
import { UiComponent } from './ui/ui.component';

import {
  MatIconModule,
  MatProgressSpinnerModule
} from '@angular/material'
import { ODataService } from './odata/odata.service';
import { Poster } from './poster/poster.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    UiComponent
  ],
  providers: [
    ODataService,
    UiService,
    Poster
  ],
  exports:[
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class SharedModule { }
