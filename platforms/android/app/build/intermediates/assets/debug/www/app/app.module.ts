import 'zonejs';
import 'reflect-metadata';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { DeviceComponent } from './device/device.component';
import { DatabaseComponent } from './database/database.component';
import { ListComponent } from './list/list.component';

@NgModule({
    imports: [
        routing,
        BrowserModule
    ],
    declarations: [
        AppComponent,
        AboutComponent,
        DeviceComponent,
        DatabaseComponent,
        ListComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }