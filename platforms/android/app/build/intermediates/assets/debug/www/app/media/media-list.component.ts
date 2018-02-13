import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Media, MediaService }  from './media.service';

@Component({
  template: `
    <h2>Media List</h2>
    <div><button (click)="reTest()">Load Data</button><br/></div><br/>
    <ul class="items">
      <li *ngFor="let media of mediaList$ | async"
        [class.selected]="media.id === selectedId">
        <a [routerLink]="['/media', media.id]">
          <span class="badge">{{ media.id }}</span>{{ media.name }}
        </a>
      </li>
    </ul>
  `
})
export class MediaListComponent implements OnInit {
    mediaList$: Observable<Media[]>;

  private selectedId: number;

  constructor(
    private service: MediaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedId = params['id'];
      this.mediaList$ = this.service.getMediaItems();
    });
    // this.mediaList$ = this.route.paramMap
    //   .switchMap((params: ParamMap) => {
    //     // (+) before `params.get()` turns the string into a number
    //     this.selectedId = +params.get('id');
    //     return this.service.getMediaItems();
    //   });
  }

  reTest(){
    this.mediaList$ = this.service.getMediaItems();
  }
}