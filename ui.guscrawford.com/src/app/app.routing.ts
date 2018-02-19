import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UiComponent } from './shared/ui/ui.component';
import { LoginComponent } from './shared/login/login.component';

const routes: Routes = [
  { path: '', redirectTo:'post', pathMatch:'full'},
  { path:'post', loadChildren:'./post/post.module#PostModule'},
  { path:'login', component:LoginComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);