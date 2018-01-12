import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractVideoComponent } from './components/abstract/abstract.component'
import { VimeoVideoComponent } from './components/vimeo/vimeo.component';
import { NativeVideoComponent } from './components/native/native.component'
import { VideoWrapperComponent } from './components/video-container/video-container.component'

import { KioNg2ComponentRoutingModule } from 'kio-ng2-component-routing'
import { KioCtnModule } from 'kio-ng2-ctn'

//export { VideoState } from './enums/video-state.enum'

@NgModule({
  imports: [
    CommonModule, KioNg2ComponentRoutingModule, KioCtnModule
  ],
  declarations: [VimeoVideoComponent,NativeVideoComponent,VideoWrapperComponent],
  entryComponents: [VimeoVideoComponent,NativeVideoComponent,VideoWrapperComponent],
  exports: [VimeoVideoComponent,NativeVideoComponent,VideoWrapperComponent, KioNg2ComponentRoutingModule, KioCtnModule]
})
export class VideoModule { }
