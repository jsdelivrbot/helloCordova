import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Media, MediaService }  from './media.service';

@Component({
  template: `
  <h2>Media List</h2>
  <div><button (click)="reloadData()">Load Data</button><br/></div><br/>
  <h3>List of Images</h3>
  <div *ngFor="let media of mediaList$ | async" [class.selected]="media.id === selectedId">
    <ul class="itemsImage" *ngIf="media.type === 'image'">
      <li>
        <a [routerLink]="['/media', media.id]">
          <span class="badge">{{ media.id }}</span>{{ media.name }}
        </a>
      </li>
    </ul>
  </div>
  <h3>List of Videos</h3>
  <div *ngFor="let media of mediaList$ | async" [class.selected]="media.id === selectedId">
    <ul class="itemsVideo" *ngIf="media.type === 'video'">
      <li>
        <a [routerLink]="['/media', media.id]">
          <span class="badge">{{ media.id }}</span>{{ media.name }}
        </a>
      </li>
    </ul>
  </div>
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
  }

  reloadData(){
    this.mediaList$ = this.service.getMediaItems();
  }
}