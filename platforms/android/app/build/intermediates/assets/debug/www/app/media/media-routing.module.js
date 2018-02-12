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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var media_list_component_1 = require('./media-list.component');
var media_detail_component_1 = require('./media-detail.component');
var mediaRoutes = [
    { path: 'media', component: media_list_component_1.MediaListComponent },
    { path: 'media/:id', component: media_detail_component_1.MediaDetailComponent }
];
var MediaRoutingModule = (function () {
    function MediaRoutingModule() {
    }
    MediaRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(mediaRoutes)
            ],
            exports: [
                router_1.RouterModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], MediaRoutingModule);
    return MediaRoutingModule;
}());
exports.MediaRoutingModule = MediaRoutingModule;
//# sourceMappingURL=media-routing.module.js.map