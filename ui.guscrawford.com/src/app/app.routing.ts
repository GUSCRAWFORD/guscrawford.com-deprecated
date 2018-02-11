import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UiComponent } from './shared/ui/ui.component';
import { LoginComponent } from './shared/login/login.component';

const routes: Routes = [
  { path: '', redirectTo:'read', pathMatch:'full' },
  { path:'read', component:UiComponent, loadChildren:'./reader/reader.module#ReaderModule'},
  { path:'edit', component:UiComponent, loadChildren:'./editor/editor.module#EditorModule'},
  { path:'edit/:id', component:UiComponent, loadChildren:'./editor/editor.module#EditorModule'},
  { path:'login', component:LoginComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);