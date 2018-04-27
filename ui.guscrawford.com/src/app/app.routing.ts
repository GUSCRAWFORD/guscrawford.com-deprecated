import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UiComponent } from './shared/ui/ui.component';
import { LoginComponent } from './shared/login/login.component';

const routes: Routes = [
  { path:'login', component:LoginComponent},
  { path:'', loadChildren:'./post/post.module#PostModule'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);