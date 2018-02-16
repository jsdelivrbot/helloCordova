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
    function Media(id, name, path, type, upload) {
        this.id = id;
        this.name = name;
        this.path = path;
        this.type = type;
        this.upload = upload;
    }
    return Media;
}());
exports.Media = Media;
var MediaItemsList = [];
var MediaService = (function () {
    function MediaService() {
        this.database = null;
        this.getMediaItemsDemo = this.getMediaItemsDemo.bind(this);
        this.initDatabase();
        this.getMediaItemsDemo(this.database);
    }
    MediaService.prototype.initDatabase = function () {
        this.database = window.sqlitePlugin.openDatabase({ name: 'sample.db', location: 'default',
            androidDatabaseImplementation: 2 });
        this.database.transaction(function (transaction) {
            transaction.executeSql('CREATE TABLE MediaList (name, path, type, upload)');
        });
        this.database.transaction(function (transaction) {
            transaction.executeSql('SELECT count(*) AS recordCount FROM MediaList', [], function (ignored, resultSet) {
                console.debug('RECORD COUNT: ' + resultSet.rows.item(0).recordCount);
            });
        }, function (error) {
            console.debug('SELECT count error: ' + error);
        });
    };
    MediaService.prototype.getMediaItemsDemo = function (db) {
        var that = this;
        db.executeSql('SELECT rowid, name, path, type, upload FROM MediaList', [], function (rs) {
            var _loop_1 = function(i) {
                items = MediaItemsList.filter(function (item) {
                    if (item.id == rs.rows.item(i).rowid) {
                        return item;
                    }
                });
                if (items.length == 0) {
                    MediaItemsList.push(new Media(rs.rows.item(i).rowid, rs.rows.item(i).name, rs.rows.item(i).path, rs.rows.item(i).type, rs.rows.item(i).upload));
                }
            };
            var items;
            for (var i = 0; i < rs.rows.length; i++) {
                _loop_1(i);
            }
        }, function (error) {
            console.log('SELECT SQL statement ERROR: ' + error.message);
        });
    };
    MediaService.prototype.getMediaItems = function () {
        this.getMediaItemsDemo(this.database);
        return Observable_1.Observable.of(MediaItemsList);
    };
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