import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: './ui/ui.module#UiModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);