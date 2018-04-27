import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewFeedComponent } from './feed/view-feed/view-feed.component';
import { ViewPostComponent } from './post/view-post/view-post.component';

import { ViewEditComponent } from './editor/view-edit/view-edit.component';
import { AuthGuardService } from '../shared/login/auth-guard.service';
const routes: Routes = [
  { path: '', redirectTo:'feed', pathMatch:'full' },
  { path: 'feed', component: ViewFeedComponent},
  { path: 'feed/:topic', component: ViewFeedComponent},
  { path: 'post/new', component: ViewEditComponent, canActivate:[AuthGuardService]},
  { path:'post/:id/edit', component: ViewEditComponent,  canActivate:[AuthGuardService]},
  { path: 'post/:id', component: ViewPostComponent},
  { path: ':title', component: ViewPostComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);