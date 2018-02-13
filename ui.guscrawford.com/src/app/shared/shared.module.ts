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
  MatButtonModule,
  MatTabsModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ODataService } from './odata/odata.service';
import { PostManager } from './post-manager/post-manager.service';
import { UserManager } from './user-manager/user-manager.service';
import { MarkdownService } from './markdown/markdown.service';
import { MarkdownPreviewComponent } from './markdown/markdown-preview.component';
import { LoginComponent } from './login/login.component';
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
    MatButtonModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    UiComponent,
    MarkdownPreviewComponent,
    LoginComponent
  ],
  providers: [
    ODataService,
    UiService,
    PostManager,
    UserManager,
    MarkdownService
  ],
  exports:[
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MarkdownPreviewComponent,
    ReactiveFormsModule,
    LoginComponent
  ]
})
export class SharedModule { }