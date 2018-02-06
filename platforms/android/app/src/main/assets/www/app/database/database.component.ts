import { Component } from '@angular/core';
@Component({
    template: `
    <h5>Database Component</h5>
    <div class="page-header">
    <h3>Cordova SQL test</h3>
    </div>
    <div class="btn-group-vertical">
        <button (click)="echoTest()">Run echo test</button> <br/>
        <button (click)="selfTest()">Run self test</button> <br/>
        <button (click)="initDatabase()">Initialize Database</button> <br/>
        <button (click)="stringTest1()">Run string test 1</button> <br/>
        <button (click)="stringTest2()">Run string test 2</button> <br/>
        <button (click)="showCount()">Show record count</button> <br/>
        <button (click)="addRecord()">INSERT a new record</button> <br/>
        <button (click)="deleteRecords()">Delete all records</button> <br/>
    </div>
    `
})

export class DatabaseComponent {
    database = null;
    nextUser = 101;

    initDatabase() {
    this.database = window.sqlitePlugin.openDatabase({name: 'sample.db', location: 'default'});

    this.database.transaction(function(transaction) {
        transaction.executeSql('CREATE TABLE SampleTable (name, score)');
    });
    }

    echoTest() {
    window.sqlitePlugin.echoTest(function() {
        console.debug('Echo test OK');
    }, function(error) {
        console.debug('Echo test ERROR: ' + error);
    });
    }

    selfTest() {
    window.sqlitePlugin.selfTest(function() {
        console.debug('Self test OK');
    }, function(error) {
        console.debug('Self test ERROR: ' + error);
    });
    }

    stringTest1() {
    this.database.transaction(function(transaction) {
        transaction.executeSql("SELECT upper('Test string') AS upperText", [], function(ignored, resultSet) {
            console.debug('Got upperText result (ALL CAPS): ' + resultSet.rows.item(0).upperText);
        });
    }, function(error) {
        console.debug('SELECT count error: ' + error);
    });
    }

    stringTest2() {
    this.database.transaction(function(transaction) {
        transaction.executeSql('SELECT upper(?) AS upperText', ['Test string'], function(ignored, resultSet) {
            console.debug('Got upperText result (ALL CAPS): ' + resultSet.rows.item(0).upperText);
        });
    }, function(error) {
        console.debug('SELECT count error: ' + error);
    });
    }

    showCount() {
    this.database.transaction(function(transaction) {
        transaction.executeSql('SELECT count(*) AS recordCount FROM SampleTable', [], function(ignored, resultSet) {
            console.debug('RECORD COUNT: ' + resultSet.rows.item(0).recordCount);
        });
    }, function(error) {
        console.debug('SELECT count error: ' + error);
    });
    }

    addRecord() {
    this.database.transaction(function(transaction) {
        transaction.executeSql('INSERT INTO SampleTable VALUES (?,?)', ['User '+this.nextUser, this.nextUser]);
    }, function(error) {
        console.debug('INSERT error: ' + error);
    }, function() {
        console.debug('INSERT OK');
        ++this.nextUser;
    });
    }

    // addJSONRecordsAfterDelay() {
    // function getJSONObjectArray() {
    //     var COUNT = 100;
    //     var myArray = [];

    //     for (var i=0; i<COUNT; ++i) {
    //     myArray.push({name: 'User '+this.nextUser, score: this.nextUser});
    //     ++this.nextUser;
    //     }

    //     return myArray;
    // }
    // }

    deleteRecords() {
    this.database.transaction(function(transaction) {
        transaction.executeSql('DELETE FROM SampleTable');
    }, function(error) {
        console.debug('DELETE error: ' + error);
    }, function() {
        console.debug('DELETE OK');
        ++this.nextUser;
    });
    }
}