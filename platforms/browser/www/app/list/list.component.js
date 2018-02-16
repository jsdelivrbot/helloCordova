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
var ListComponent = (function () {
    function ListComponent() {
        this.database = null;
        this.initDatabase();
        this.showList(this.database);
    }
    ListComponent.prototype.displayVideo = function (fullPath) {
        document.getElementById("videoFile").getElementsByTagName("video")[0].src = fullPath;
    };
    ListComponent.prototype.mediaCapt = function (selection) {
        var funcVid = this.displayVideo;
        var funcAddRecords = this.addRecords;
        var funcShowList = this.showList;
        var db = this.database;
        if (selection == "image") {
            navigator.device.capture.captureImage(function captureSuccess(mediaFiles) {
                var i, len;
                for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                    funcAddRecords(mediaFiles[i], 'image', false, db);
                }
                funcShowList(db);
            }, function captureError(error) {
                console.debug("Unable to obtain picture: " + error, "app");
            }, { limit: 2 });
        }
        if (selection == "video") {
            navigator.device.capture.captureVideo(function captureSuccess(mediaFiles) {
                var i, len;
                for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                    funcAddRecords(mediaFiles[i], 'video', false, db);
                }
                funcShowList(db);
            }, function captureError(error) {
                console.debug("Unable to obtain picture: " + error, "app");
            }, { limit: 2 });
        }
    };
    ListComponent.prototype.initDatabase = function () {
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
    ListComponent.prototype.addRecords = function (medfl, type, upload, db) {
        var name = medfl.name;
        var path = medfl.fullPath;
        db.transaction(function (tx) {
            var query = "INSERT INTO MediaList (name, path, type, upload) VALUES (?,?,?,?)";
            tx.executeSql(query, [name, path, type, upload], function (tx, res) {
                console.log('add record OK');
            }, function (tx, error) {
                console.log('INSERT error: ' + error.message);
            });
        }, function (error) {
            console.log('transaction error: ' + error.message);
        }, function () {
            console.log('transaction ok');
        });
    };
    ListComponent.prototype.selectFromDemo = function () {
        this.database.executeSql('SELECT * FROM MediaList', [], function (rs) {
            for (var i = 0; i < rs.rows.length; i++) {
                console.log('Record ' + i + ' => name: ' + rs.rows.item(i).name
                    + ' path: ' + rs.rows.item(i).path + ' type: ' + rs.rows.item(i).type
                    + ' upload: ' + rs.rows.item(i).upload);
            }
        }, function (error) {
            console.log('SELECT SQL statement ERROR: ' + error.message);
        });
    };
    ListComponent.prototype.showList = function (db) {
        var cl = "";
        db.executeSql('SELECT * FROM MediaList', [], function (rs) {
            cl += "<ul>";
            for (var i = 0; i < rs.rows.length; i++) {
                cl += '<li>' + rs.rows.item(i).name + '</li>';
            }
            cl += '</ul>';
            document.getElementById("captureList").innerHTML = cl;
        }, function (error) {
            console.log('SELECT SQL statement ERROR: ' + error.message);
        });
    };
    ListComponent = __decorate([
        core_1.Component({
            template: "\n    <h5>Capture Options</h5>\n    <div><button (click)=\"mediaCapt('image')\">Media Capture Image</button><br/></div><br/>\n    <div><button (click)=\"mediaCapt('video')\">Media Capture Video</button><br/></div><br/>\n    <div></div><br/>\n    <h4>All Media List</h4>\n    <div id=\"captureList\"></div><br/>\n    <router-outlet></router-outlet>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=list.component.js.map