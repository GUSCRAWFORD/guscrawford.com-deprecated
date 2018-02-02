import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QueryComponent } from './shared/query/query.component';

const routes: Routes = [
  { path: '', redirectTo: 'query', pathMatch: 'full' },
  { path: 'query/:collectionName', component: QueryComponent }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);