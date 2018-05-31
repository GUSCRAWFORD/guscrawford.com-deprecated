import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewDocsComponent } from './view-docs/view-docs.component';
import { AuthGuardService } from '../shared/login/auth-guard.service';
const routes: Routes = [
  { path: '', component: ViewDocsComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);