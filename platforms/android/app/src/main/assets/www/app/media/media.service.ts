import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export class Media {
  constructor(public id: number, public name: string, 
    public path: string, public type: string, public upload: boolean) { }
}

var MediaItemsList: Media[] = [];

@Injectable()
export class MediaService {
  database = null;
  constructor(){
    this.getMediaItemsDemo = this.getMediaItemsDemo.bind(this);
    this.initDatabase();
    this.getMediaItemsDemo(this.database);
  }

  // database helper
  initDatabase() {
    this.database = window.sqlitePlugin.openDatabase({name: 'sample.db', location: 'default'
                            , androidDatabaseImplementation: 2});

    this.database.transaction(function(transaction) {
        transaction.executeSql('CREATE TABLE MediaList (name, path, type, upload)');
    });

    // showCount
    this.database.transaction(function(transaction) {
        transaction.executeSql('SELECT count(*) AS recordCount FROM MediaList', [], function(ignored, resultSet) {
            console.debug('RECORD COUNT: ' + resultSet.rows.item(0).recordCount);
        });
    }, function(error) {
        console.debug('SELECT count error: ' + error);
    });
  }

  getMediaItemsDemo(db){
    var that = this;
    db.executeSql('SELECT rowid, name, path, type, upload FROM MediaList', [], function(rs) {
        for(let i=0; i<rs.rows.length; i++){
          var items = MediaItemsList.filter((item)=> {
                if (item.id == rs.rows.item(i).rowid)
                {return item;}});
          if (items.length == 0){
            MediaItemsList.push(new Media(rs.rows.item(i).rowid, rs.rows.item(i).name, 
              rs.rows.item(i).path, rs.rows.item(i).type, rs.rows.item(i).upload));
          }
        }
      }, function(error) {
        console.log('SELECT SQL statement ERROR: ' + error.message);
      });
  }

  getMediaItems() { 
    this.getMediaItemsDemo(this.database);
    
    // console.log(MediaItemsList.filter((item)=> {
    //   if(item.id == 3)
    //     return item;
    // }));

    return Observable.of(MediaItemsList); 
  }

  getMedia(id: number | string) {
    return this.getMediaItems()
      // (+) before `id` turns the string into a number
      .map(mediaItems => mediaItems.find(media => media.id === +id));
  }
}
