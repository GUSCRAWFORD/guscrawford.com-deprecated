import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ODataService } from './odata/odata.service';
import { Poster } from './poster/poster.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    ODataService,
    Poster
  ]
})
export class SharedModule { }
