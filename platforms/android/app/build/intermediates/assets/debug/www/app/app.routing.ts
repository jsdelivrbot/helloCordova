import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceComponent } from './device/device.component';
import { AboutComponent } from './about/about.component';
import { DatabaseComponent } from './database/database.component';
import { ListComponent } from './list/list.component';

export const routes: Routes = [
    { path: '', component: AboutComponent },
    { path: 'device', component: DeviceComponent },
    { path: 'database', component: DatabaseComponent },
    { path: 'list', component: ListComponent },
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);