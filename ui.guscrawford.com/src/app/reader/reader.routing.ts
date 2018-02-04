import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewReadComponent } from './view-read/view-read.component';

const routes: Routes = [
  { path: '', component: ViewReadComponent, outlet:"ui" }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);