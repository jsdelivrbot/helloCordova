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
require('rxjs/add/observable/of');
require('rxjs/add/operator/map');
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
var Media = (function () {
    function Media(id, name) {
        this.id = id;
        this.name = name;
    }
    return Media;
}());
exports.Media = Media;
var MEDIAITEMS = [
    new Media(11, 'Mr. Nice'),
    new Media(12, 'Narco'),
    new Media(13, 'Bombasto'),
    new Media(14, 'Celeritas'),
    new Media(15, 'Magneta'),
    new Media(16, 'RubberMan')
];
var MediaService = (function () {
    function MediaService() {
    }
    MediaService.prototype.getMediaItems = function () { return Observable_1.Observable.of(MEDIAITEMS); };
    MediaService.prototype.getMedia = function (id) {
        return this.getMediaItems()
            .map(function (mediaItems) { return mediaItems.find(function (media) { return media.id === +id; }); });
    };
    MediaService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MediaService);
    return MediaService;
}());
exports.MediaService = MediaService;
//# sourceMappingURL=media.service.js.map