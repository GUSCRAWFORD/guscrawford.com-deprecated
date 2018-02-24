import { NgModule, ModuleWithProviders } from '@angular/core';
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
  MatToolbarModule,
  MatExpansionModule,
  MatSlideToggleModule,
  MatListModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ODataService } from './odata/odata.service';
import { PostManager } from './post-manager/post-manager.service';
import { UserManager } from './user-manager/user-manager.service';
import { MarkdownService } from './markdown/markdown.service';
import { MarkdownPreviewComponent } from './markdown/markdown-preview.component';
import { LoginComponent } from './login/login.component';
import { UiToolbarComponent } from './ui/ui-toolbar/ui-toolbar.component';
import { UiDrawerMenuComponent } from './ui/ui-drawer-menu/ui-drawer-menu.component';
import { UiDrawerPageWrapComponent } from './ui/ui-drawer-page-wrap/ui-drawer-page-wrap.component';

import { AuthGuardService } from '../shared/login/auth-guard.service';

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
    MatExpansionModule,
    MatSlideToggleModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    UiComponent,
    MarkdownPreviewComponent,
    LoginComponent,
    UiToolbarComponent,
    UiDrawerMenuComponent,
    UiDrawerPageWrapComponent
  ],
  // providers: [
  //   ODataService,
  //   UiService,
  //   PostManager,
  //   UserManager,
  //   MarkdownService,
  //   AuthGuardService
  // ],
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
    MatExpansionModule,
    MatSlideToggleModule,
    MatListModule,
    MarkdownPreviewComponent,
    ReactiveFormsModule,
    LoginComponent,
    UiComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ODataService,
        UiService,
        PostManager,
        UserManager,
        MarkdownService,
        AuthGuardService]
    };
  }
}