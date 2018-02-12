import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export class Media {
  constructor(public id: number, public name: string) { }
}

const MEDIAITEMS = [
  new Media(11, 'Mr. Nice'),
  new Media(12, 'Narco'),
  new Media(13, 'Bombasto'),
  new Media(14, 'Celeritas'),
  new Media(15, 'Magneta'),
  new Media(16, 'RubberMan')
];

@Injectable()
export class MediaService {
    getMediaItems() { return Observable.of(MEDIAITEMS); }

  getMedia(id: number | string) {
    return this.getMediaItems()
      // (+) before `id` turns the string into a number
      .map(mediaItems => mediaItems.find(media => media.id === +id));
  }
}
