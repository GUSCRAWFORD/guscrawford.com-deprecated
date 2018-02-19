import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewReadComponent } from './reader/view-read/view-read.component';

import { ViewEditComponent } from './editor/view-edit/view-edit.component';

const routes: Routes = [
  { path: '', redirectTo:'feed', pathMatch:'full' },
  { path: 'feed', component: ViewReadComponent},
  { path: 'new', component: ViewEditComponent},
  { path:':id/edit', component: ViewEditComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);