import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UiComponent } from './shared/ui/ui.component';
import { LoginComponent } from './shared/login/login.component';

const routes: Routes = [
  { path:'login', component:LoginComponent},
  { path:':package/docs/:version', loadChildren:'./docs/docs.module#DocsModule'},
  { path:'', loadChildren:'./posts/posts.module#PostsModule'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);