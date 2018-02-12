import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { MediaListComponent }    from './media-list.component';
import { MediaDetailComponent }  from './media-detail.component';
import { MediaService } from './media.service';
import { MediaRoutingModule } from './media-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MediaRoutingModule
  ],
  declarations: [
    MediaListComponent,
    MediaDetailComponent
  ],
  providers: [ MediaService ]
})
export class MediaModule {}
