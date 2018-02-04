import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UiComponent } from './ui.component';

const routes: Routes = [
    { path: '', redirectTo:'read', pathMatch:'full' },
    { path:'read', component:UiComponent, loadChildren:'../reader/reader.module#ReaderModule'},
    { path:'edit', component:UiComponent, loadChildren:'../editor/editor.module#EditorModule'}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);