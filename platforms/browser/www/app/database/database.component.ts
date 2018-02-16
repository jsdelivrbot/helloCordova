import { Component } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
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
        <button (click)="populateDatabase()">populate Database</button> <br/>
        <button (click)="selectFromDemo()">select From Demo</button> <br/>
    </div>
    `
})

export class DatabaseComponent {
    database = null;
    nextUser = 101;

    initDatabase() {
        // WARNING: Multiple SQLite problem on Android => androidDatabaseImplementation: 2
        // https://github.com/litehelpers/Cordova-sqlite-storage
    this.database = window.sqlitePlugin.openDatabase({name: 'sample.db', location: 'default'
                            , androidDatabaseImplementation: 2});

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

    // To populate a database using the standard transaction API
    // populateDatabase(){
    //     this.database.transaction(function(tx) {
    //         tx.executeSql('CREATE TABLE IF NOT EXISTS DemoTable (name, score)');
    //         tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Alice', 101]);
    //         tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202]);
    //       }, function(error) {
    //         console.log('Transaction ERROR: ' + error.message);
    //       }, function() {
    //         console.log('Populated database OK');
    //       });
    // }

    // selectFromDemo(){
    //     this.database.transaction(function(tx) {
    //         tx.executeSql('SELECT count(*) AS mycount FROM DemoTable', [], function(tx, rs) {
    //           console.log('Record count (expected to be 2): ' + rs.rows.item(0).mycount);
    //           console.log('Record one => name: ' + rs.rows.item(0).name + ' score: ' + rs.rows.item(0).score);
    //         }, function(tx, error) {
    //           console.log('SELECT error: ' + error.message);
    //         });
    //       });
    // }

    // Using recommended API calls
    populateDatabase(){
        this.database.sqlBatch([
            'CREATE TABLE IF NOT EXISTS DemoTable (name, score)',
            [ 'INSERT INTO DemoTable VALUES (?,?)', ['Alice', 101] ],
            [ 'INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202] ],
          ], function() {
            console.log('Populated database OK');
          }, function(error) {
            console.log('SQL batch ERROR: ' + error.message);
          });
    }

    selectFromDemo(){
        this.database.executeSql('SELECT * FROM DemoTable', [], function(rs) {
            for(let i=0; i<rs.rows.length; i++){
                console.log('Record ' + i + ' => name: ' + rs.rows.item(i).name 
                    + ' score: ' + rs.rows.item(i).score);
            }
          }, function(error) {
            console.log('SELECT SQL statement ERROR: ' + error.message);
          });
    }

    // SELECT name FROM sqlite_master WHERE type='table' AND name='table_name'  COLLATE NOCASE;
}