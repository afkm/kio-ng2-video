import { Component, Input, Output, QueryList, EventEmitter, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { RoutableComponent, ContentDataComponent, ContentLoaderDirective, ResizingService } from 'kio-ng2-component-routing'
import { VideoState } from '../../enums/video-state.enum'
import { KioOEmbed, KioOEmbedData } from 'kio-ng2-data'
import { AbstractVideoComponent } from '../abstract/abstract.component'


@RoutableComponent({
  selector: 'publication-native-video',
  templateUrl: './native.component.html',
  styleUrls: ['./native.component.scss'],
  encapsulation: ViewEncapsulation.None,
  queryable: {
    type: 'src' 
  }
})
export class NativeVideoComponent extends AbstractVideoComponent {

  public playVideo ( ) {
    
  }

  protected prepareVideo() {

    if ( this.node.headers['mimeType'] && this.node.headers['mimeType'].indexOf('image') === 0 ) {
      throw Error(`Wrong mime type for video: ${this.node.headers['mimeType']}`)
    }

    this.vimeoPlayer = new VimeoPlayer(this.container.nativeElement,{
      id: this.data.oEmbed.raw.video_id
    })
    this.vimeoPlayer.on('loaded',()=>this.updateVideoState(VideoState.ready))
    this.vimeoPlayer.on('play',()=>this.updateVideoState(VideoState.playing))
    this.vimeoPlayer.on('pause',()=>this.updateVideoState(VideoState.paused))
    this.vimeoPlayer.on('ended',()=>this.updateVideoState(VideoState.finished))
  }


  protected getContainerBounds(){
    return this.container.nativeElement.getBoundingClientRect() 
  }

  updateBounds ( size:{width:number, height:number} ) {
    this.iframe.nativeElement.setAttribute ( 'width' , size.width + 'px' )
    this.iframe.nativeElement.setAttribute ( 'height' , (size.width / this.getRatio()) + 'px' )
  }

}
