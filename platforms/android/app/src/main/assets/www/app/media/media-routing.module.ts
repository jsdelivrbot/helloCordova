import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MediaListComponent }    from './media-list.component';
import { MediaDetailComponent }  from './media-detail.component';

const mediaRoutes: Routes = [
  { path: 'media',  component: MediaListComponent },
  { path: 'media/:id', component: MediaDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(mediaRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MediaRoutingModule { }
