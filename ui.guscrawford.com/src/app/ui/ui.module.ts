import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './ui.routing';
import { UiService } from './ui.service';
import { UiComponent } from './ui.component';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [UiComponent],
  providers: [UiService]
})
export class UiModule { }
