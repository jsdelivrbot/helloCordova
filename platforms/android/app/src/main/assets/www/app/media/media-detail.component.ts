import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
//import { slideInDownAnimation } from '../animations';

import { Media, MediaService } from './media.service';

@Component({
  template: `
    <h2>Media Detail</h2>
    <div *ngIf="media$">
      <button (click)="uploadFile(media$)">Upload File</button>
      <h3>{{ media$.name }}</h3>
      <div id="imageFile" *ngIf="media$.type === 'image'">
        <img src="{{ media$.path }}" alt="Image Unavailable" width="250"/>
      </div>
      <div id="videoFile" *ngIf="media$.type === 'video'">
        <video width="225" controls><source src="{{ media$.path }}" type="video/mp4"></video>
      </div>
      <p>
        <button (click)="gotoMediaList(media$)">Back</button>
      </p>
    </div>
    `
})
/* 
  <div *ngIf="media$ | async"> 
  
  <div><button (click)="reloadData()">Load Data</button><br/></div><br/>

  <div><label>Id: </label>{{ media$.id }}</div>
  <div><label>Name: </label>{{ media$.name }}</div>
  <div><label>Path: </label>{{ media$.path }}</div>
*/

export class MediaDetailComponent implements OnInit {
  //@HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  // media$: Observable<Media>;
  media$: Media;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: MediaService
  ) { }

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

  // reloadData(){
  //   this.media$ = this.service.getMedia(this.route.params['id']);
  // }

  uploadFile(media: Media) {
    var ft = new FileTransfer();
    ft.upload(media.path, "http://192.168.0.32/hybridTest/upload.php?name="+media.name, function (result) {
      console.log(JSON.stringify(result));
    }, function (error) {
      console.log(JSON.stringify(error));
    });
  }
}
