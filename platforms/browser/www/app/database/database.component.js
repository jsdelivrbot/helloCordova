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
var DatabaseComponent = (function () {
    function DatabaseComponent() {
        this.database = null;
        this.nextUser = 101;
    }
    DatabaseComponent.prototype.initDatabase = function () {
        this.database = window.sqlitePlugin.openDatabase({ name: 'sample.db', location: 'default',
            androidDatabaseImplementation: 2 });
        this.database.transaction(function (transaction) {
            transaction.executeSql('CREATE TABLE SampleTable (name, score)');
        });
    };
    DatabaseComponent.prototype.echoTest = function () {
        window.sqlitePlugin.echoTest(function () {
            console.debug('Echo test OK');
        }, function (error) {
            console.debug('Echo test ERROR: ' + error);
        });
    };
    DatabaseComponent.prototype.selfTest = function () {
        window.sqlitePlugin.selfTest(function () {
            console.debug('Self test OK');
        }, function (error) {
            console.debug('Self test ERROR: ' + error);
        });
    };
    DatabaseComponent.prototype.stringTest1 = function () {
        this.database.transaction(function (transaction) {
            transaction.executeSql("SELECT upper('Test string') AS upperText", [], function (ignored, resultSet) {
                console.debug('Got upperText result (ALL CAPS): ' + resultSet.rows.item(0).upperText);
            });
        }, function (error) {
            console.debug('SELECT count error: ' + error);
        });
    };
    DatabaseComponent.prototype.stringTest2 = function () {
        this.database.transaction(function (transaction) {
            transaction.executeSql('SELECT upper(?) AS upperText', ['Test string'], function (ignored, resultSet) {
                console.debug('Got upperText result (ALL CAPS): ' + resultSet.rows.item(0).upperText);
            });
        }, function (error) {
            console.debug('SELECT count error: ' + error);
        });
    };
    DatabaseComponent.prototype.showCount = function () {
        this.database.transaction(function (transaction) {
            transaction.executeSql('SELECT count(*) AS recordCount FROM SampleTable', [], function (ignored, resultSet) {
                console.debug('RECORD COUNT: ' + resultSet.rows.item(0).recordCount);
            });
        }, function (error) {
            console.debug('SELECT count error: ' + error);
        });
    };
    DatabaseComponent.prototype.addRecord = function () {
        this.database.transaction(function (transaction) {
            transaction.executeSql('INSERT INTO SampleTable VALUES (?,?)', ['User ' + this.nextUser, this.nextUser]);
        }, function (error) {
            console.debug('INSERT error: ' + error);
        }, function () {
            console.debug('INSERT OK');
            ++this.nextUser;
        });
    };
    DatabaseComponent.prototype.deleteRecords = function () {
        this.database.transaction(function (transaction) {
            transaction.executeSql('DELETE FROM SampleTable');
        }, function (error) {
            console.debug('DELETE error: ' + error);
        }, function () {
            console.debug('DELETE OK');
            ++this.nextUser;
        });
    };
    DatabaseComponent.prototype.populateDatabase = function () {
        this.database.sqlBatch([
            'CREATE TABLE IF NOT EXISTS DemoTable (name, score)',
            ['INSERT INTO DemoTable VALUES (?,?)', ['Alice', 101]],
            ['INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202]],
        ], function () {
            console.log('Populated database OK');
        }, function (error) {
            console.log('SQL batch ERROR: ' + error.message);
        });
    };
    DatabaseComponent.prototype.selectFromDemo = function () {
        this.database.executeSql('SELECT * FROM DemoTable', [], function (rs) {
            for (var i = 0; i < rs.rows.length; i++) {
                console.log('Record ' + i + ' => name: ' + rs.rows.item(i).name
                    + ' score: ' + rs.rows.item(i).score);
            }
        }, function (error) {
            console.log('SELECT SQL statement ERROR: ' + error.message);
        });
    };
    DatabaseComponent = __decorate([
        core_1.Component({
            template: "\n    <h5>Database Component</h5>\n    <div class=\"page-header\">\n    <h3>Cordova SQL test</h3>\n    </div>\n    <div class=\"btn-group-vertical\">\n        <button (click)=\"echoTest()\">Run echo test</button> <br/>\n        <button (click)=\"selfTest()\">Run self test</button> <br/>\n        <button (click)=\"initDatabase()\">Initialize Database</button> <br/>\n        <button (click)=\"stringTest1()\">Run string test 1</button> <br/>\n        <button (click)=\"stringTest2()\">Run string test 2</button> <br/>\n        <button (click)=\"showCount()\">Show record count</button> <br/>\n        <button (click)=\"addRecord()\">INSERT a new record</button> <br/>\n        <button (click)=\"deleteRecords()\">Delete all records</button> <br/>\n        <button (click)=\"populateDatabase()\">populate Database</button> <br/>\n        <button (click)=\"selectFromDemo()\">select From Demo</button> <br/>\n    </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], DatabaseComponent);
    return DatabaseComponent;
}());
exports.DatabaseComponent = DatabaseComponent;
//# sourceMappingURL=database.component.js.map