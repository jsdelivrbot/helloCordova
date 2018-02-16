"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require('rxjs/add/operator/switchMap');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var media_service_1 = require('./media.service');
var MediaListComponent = (function () {
    function MediaListComponent(service, route) {
        this.service = service;
        this.route = route;
    }
    MediaListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.selectedId = params['id'];
            _this.mediaList$ = _this.service.getMediaItems();
        });
    };
    MediaListComponent.prototype.reloadData = function () {
        this.mediaList$ = this.service.getMediaItems();
    };
    MediaListComponent = __decorate([
        core_1.Component({
            template: "\n  <h2>Media List</h2>\n  <div><button (click)=\"reloadData()\">Load Data</button><br/></div><br/>\n  <h3>Images</h3>\n  <div *ngFor=\"let media of mediaList$ | async\" [class.selected]=\"media.id === selectedId\">\n    <ul class=\"itemsImage\" *ngIf=\"media.type === 'image'\">\n      <li>\n        <a [routerLink]=\"['/media', media.id]\">\n          <span class=\"badge\">{{ media.id }}</span>{{ media.name }}\n        </a>\n      </li>\n    </ul>\n  </div>\n  <h3>Videos</h3>\n  <div *ngFor=\"let media of mediaList$ | async\" [class.selected]=\"media.id === selectedId\">\n    <ul class=\"itemsVideo\" *ngIf=\"media.type === 'video'\">\n      <li>\n        <a [routerLink]=\"['/media', media.id]\">\n          <span class=\"badge\">{{ media.id }}</span>{{ media.name }}\n        </a>\n      </li>\n    </ul>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [media_service_1.MediaService, router_1.ActivatedRoute])
    ], MediaListComponent);
    return MediaListComponent;
}());
exports.MediaListComponent = MediaListComponent;
//# sourceMappingURL=media-list.component.js.map