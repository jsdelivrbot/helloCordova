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
var MediaDetailComponent = (function () {
    function MediaDetailComponent(route, router, service) {
        this.route = route;
        this.router = router;
        this.service = service;
        this.display = 'block';
        this.position = 'absolute';
    }
    MediaDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.media$ = _this.service.getMedia(params['id']);
        });
    };
    MediaDetailComponent.prototype.gotoMediaList = function (media) {
        var mediaId = media ? media.id : null;
        this.router.navigate(['/media', { id: mediaId, foo: 'foo' }]);
    };
    __decorate([
        core_1.HostBinding('style.display'), 
        __metadata('design:type', Object)
    ], MediaDetailComponent.prototype, "display", void 0);
    __decorate([
        core_1.HostBinding('style.position'), 
        __metadata('design:type', Object)
    ], MediaDetailComponent.prototype, "position", void 0);
    MediaDetailComponent = __decorate([
        core_1.Component({
            template: "\n  <h2>Media Detail</h2>\n  <div *ngIf=\"media$\">\n    <h3>{{ media$.name }}</h3>\n    <div id=\"imageFile\" *ngIf=\"media$.type === 'image'\">\n      <img src=\"{{ media$.path }}\" alt=\"Image Unavailable\" width=\"250\"/>\n    </div>\n    <div id=\"videoFile\" *ngIf=\"media$.type === 'video'\">\n      <video width=\"225\" controls><source src=\"{{ media$.path }}\" type=\"video/mp4\"></video>\n    </div>\n    <p>\n      <button (click)=\"gotoMediaList(media$)\">Back</button>\n    </p>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, media_service_1.MediaService])
    ], MediaDetailComponent);
    return MediaDetailComponent;
}());
exports.MediaDetailComponent = MediaDetailComponent;
//# sourceMappingURL=media-detail.component.js.map