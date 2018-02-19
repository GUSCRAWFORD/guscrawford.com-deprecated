
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routing } from './app.routing';

import { UiComponent } from './shared/ui/ui.component';

@NgModule({
  // declarations: [
  //   AppComponent
  // ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    routing
  ],
  providers: [],
  bootstrap: [UiComponent],
  exports:[
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AppModule { }
