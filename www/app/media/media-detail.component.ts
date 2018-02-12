import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

//import { slideInDownAnimation } from '../animations';

import { Media, MediaService }  from './media.service';

@Component({
  template: `
  <h2>Media List</h2>
  <div *ngIf="media$ | async">
    <h3>"{{ media$.name }}"</h3>
    <div>
      <label>Id: </label>{{ media$.id }}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="media$.name" placeholder="name"/>
    </div>
    <p>
      <button (click)="gotoMediaList(media$)">Back</button>
    </p>
  </div>
  `
})
export class MediaDetailComponent implements OnInit {
  //@HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  media$: Observable<Media>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: MediaService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.media$ = this.service.getMedia(params['id']);
    });

    // this.media$ = this.route.paramMap
    //   .switchMap((params: ParamMap) =>
    //     this.service.getMedia(params.get('id'))); 
  }

  gotoMediaList(media: Media) {
    let mediaId = media ? media.id : null;
    // Pass along the media id if available
    // so that the MediaList component can select that media.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/media', { id: mediaId, foo: 'foo' }]);
  }
}
