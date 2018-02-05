import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { UiService } from './ui/ui.service';
import { UiComponent } from './ui/ui.component';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/share';

import {
  MatIconModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatCardModule,
  MatFormFieldModule,
  MatFormField,
  MatInputModule,
  MatButtonModule
} from '@angular/material'
import { ODataService } from './odata/odata.service';
import { Poster } from './poster/poster.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
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
    MatProgressSpinnerModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class SharedModule { }
export { Observable };
export * from 'rxjs/add/operator/take';
export * from 'rxjs/add/operator/map';
export * from 'rxjs/add/operator/mergeMap';
export * from 'rxjs/add/operator/share';