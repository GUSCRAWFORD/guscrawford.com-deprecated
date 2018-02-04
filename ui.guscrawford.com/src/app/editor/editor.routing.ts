import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewEditComponent } from './view-edit/view-edit.component';

const routes: Routes = [
  { path: '', component: ViewEditComponent, outlet:"ui" }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);