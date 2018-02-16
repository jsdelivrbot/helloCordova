import { Component } from '@angular/core';
@Component({
    selector: 'app',
    template: `
    <a [routerLink]="['']">About</a> 
    | <a [routerLink]="['list']">Capture</a> 
    | <a routerLink="/media" routerLinkActive="active">Media</a> 
    <br/> <router-outlet></router-outlet>
    `
})
/*  
    <a [routerLink]="['device']">Device</a> | 
    <a [routerLink]="['database']">Database</a>
 */
export class AppComponent {
    constructor() {
        document.addEventListener('deviceready', function () {
            console.log('device ready received');
        }, false)
    }
}