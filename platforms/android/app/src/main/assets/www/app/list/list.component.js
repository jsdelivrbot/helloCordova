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
        this.captureList = "";
        this.initDatabase();
        this.captureList += '<ul><li><h3> hello!! </h3></li></ul>';
    }
    ListComponent.prototype.displayVideo = function (fullPath) {
        document.getElementById("videoFile").getElementsByTagName("video")[0].src = fullPath;
    };
    ListComponent.prototype.mediaCapt = function (selection) {
        var funcVid = this.displayVideo;
        var funcVid1 = this.addRecords;
        var funcVid2 = this.showList;
        var db = this.database;
        var cl = this.captureList;
        if (selection == "image") {
            navigator.device.capture.captureImage(function captureSuccess(mediaFiles) {
                var i, path, len, name;
                for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                    path = mediaFiles[i].fullPath;
                    name = mediaFiles[i].name;
                    funcVid1(mediaFiles[i], 'video', false, db);
                }
            }, function captureError(error) {
                console.debug("Unable to obtain picture: " + error, "app");
            }, { limit: 1 });
        }
        if (selection == "video") {
            navigator.device.capture.captureVideo(function captureSuccess(mediaFiles) {
                console.debug("test mediaFiles: " + mediaFiles[0].fullPath, " app");
                funcVid(mediaFiles[0].fullPath);
            }, function captureError(error) {
                console.debug("Unable to obtain picture: " + error, "app");
            }, { limit: 1 });
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
    ListComponent.prototype.showList = function (cl, db) {
        db.executeSql('SELECT * FROM MediaList', [], function (rs) {
            cl += "<ul>";
            cl += '<li><h3> hello!! </h3></li>';
            cl += '</ul>';
        }, function (error) {
            console.log('SELECT SQL statement ERROR: ' + error.message);
        });
        return cl;
    };
    ListComponent = __decorate([
        core_1.Component({
            template: "\n    <h5>List Component</h5>\n\n    <div><button (click)=\"mediaCapt('image')\">Media Capture Image</button><br/></div><br/>\n    <div><button (click)=\"mediaCapt('video')\">Media Capture Video</button><br/></div><br/>\n    \n    <div></div><br/>\n    <div [innerHTML]=\"captureList\"></div><br/>\n    <div id=\"imageFile\"><img alt=\"test image\"/></div><br/>\n    \n    <div></div><br/>\n    \n    <div id=\"videoFile\">\n        <video controls muted> <source src=\"\" type=\"video/mp4\"> </video>\n    </div><br/>\n    <button (click)=\"selectFromDemo()\">select From Demo</button> <br/>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=list.component.js.map