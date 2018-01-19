import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoWrapperComponent } from './components/video-container/video-container.component';
import { NativeVideoComponent } from './components/native/native.component'
import { VimeoVideoComponent } from './components/vimeo/vimeo.component'

import { KioNg2ComponentRoutingModule } from 'kio-ng2-component-routing'
import { KioCtnModule } from 'kio-ng2-ctn'

//export { VideoState } from './enums/video-state.enum'

const VideoComponents = [ NativeVideoComponent, VimeoVideoComponent, VideoWrapperComponent ]

@NgModule({
  imports: [
    CommonModule, KioNg2ComponentRoutingModule, KioCtnModule
  ],
  declarations: [...VideoComponents],
  entryComponents: [...VideoComponents],
  exports: [...VideoComponents, KioNg2ComponentRoutingModule, KioCtnModule]
})
export class VideoModule { }
