import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewReadComponent } from './reader/view-read/view-read.component';

import { ViewEditComponent } from './editor/view-edit/view-edit.component';
import { AuthGuardService } from '../shared/login/auth-guard.service';
const routes: Routes = [
  { path: '', redirectTo:'feed', pathMatch:'full' },
  { path: 'feed', component: ViewReadComponent},
  { path: 'feed/:topic', component: ViewReadComponent},
  { path: 'new', component: ViewEditComponent, canActivate:[AuthGuardService]},
  { path:':id/edit', component: ViewEditComponent,  canActivate:[AuthGuardService]}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);