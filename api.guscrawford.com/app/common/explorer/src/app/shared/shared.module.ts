import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryComponent } from './query/query.component';
import { QueryEditorComponent } from './query-editor/query-editor.component';
import { OdataService } from './services/odata.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [QueryComponent, QueryEditorComponent],
  providers: [OdataService]
})
export class SharedModule { }
