import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryComponent } from './query/query.component';
import { QueryEditorComponent } from './query-editor/query-editor.component';
import { OdataService } from './services/odata.service';
import { KeyValuePairsPipe } from './pipes/objects.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    QueryComponent,
    QueryEditorComponent,
    KeyValuePairsPipe
  ],
  providers: [OdataService]
})
export class SharedModule { }
