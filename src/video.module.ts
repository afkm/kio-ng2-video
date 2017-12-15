import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VimeoVideoComponent } from './components/vimeo/vimeo.component';
import { NativeVideoComponent } from './components/native/native.component'
import { VideoComponent } from './components/video-container/video-container.component'

import { KioNg2ComponentRoutingModule } from 'kio-ng2-component-routing'
import { KioCtnModule } from 'kio-ng2-ctn'

//export { VideoState } from './enums/video-state.enum'

@NgModule({
  imports: [
    CommonModule, KioNg2ComponentRoutingModule, KioCtnModule
  ],
  declarations: [VimeoVideoComponent,NativeVideoComponent,VideoComponent],
  entryComponents: [VideoComponent],
  exports: [VideoComponent, KioNg2ComponentRoutingModule, KioCtnModule]
})
export class VideoModule { }
