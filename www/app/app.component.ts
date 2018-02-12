import { Component } from '@angular/core';
@Component({
    selector: 'app',
    template: `
    <a [routerLink]="['']">About</a> | <a [routerLink]="['device']">Device</a>
    | <a [routerLink]="['database']">Database</a>
    | <a [routerLink]="['list']">List</a> <br/>
    | <a routerLink="/media" routerLinkActive="active">Media</a>
    <router-outlet></router-outlet>
    `
})

export class AppComponent {
    constructor() {
        document.addEventListener('deviceready', function () {
            console.log('device ready received');
        }, false)
    }
}