import { Component, Input, Output, QueryList, EventEmitter, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { RoutableComponent, ContentDataComponent, ContentLoaderDirective, ResizingService } from 'kio-ng2-component-routing'
import { VideoState } from '../../enums/video-state.enum'
import { VideoType } from '../../enums/video-type.enum'
import { KioOEmbed, KioOEmbedData, KioContentModel } from 'kio-ng2-data'
import { VideoData } from 'kio-ng2-ctn'
import { AbstractVideoComponent } from '../abstract/abstract.component'
import { VideoSource } from './interfaces'
export { VideoSource } from './interfaces'
import { KioVideoData } from '../../interfaces/video-node'

@Component({
  moduleId: module.id,
  selector: 'publication-native-video',
  templateUrl: './native.component.html',
  styleUrls: ['./native.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NativeVideoComponent extends AbstractVideoComponent<'native'> {

  @Input() node:KioContentModel

  @Input() controls:boolean
  @Input() autoplay:boolean

  public sources:VideoSource[]

  @ViewChild('videoElement') videoElement:ElementRef


  public playVideo ( ) {
    
  }

  protected prepareVideo() {

    if ( this.videoData.headers['mimeType'] && this.videoData.headers['mimeType'].indexOf('video') !== 0 ) {
      throw Error(`Wrong mime type for video: ${this.videoData.headers['mimeType']}`)
    }

    this.sources = [
      {
        mimeType: this.videoData.headers.mimeType,
        src: this.videoData.raw.link
      }
    ]
    /*
    this.vimeoPlayer = new VimeoPlayer(this.container.nativeElement,{
      id: this.node.oEmbed.raw.video_id
    })
    this.vimeoPlayer.on('loaded',()=>this.updateVideoState(VideoState.ready))
    this.vimeoPlayer.on('play',()=>this.updateVideoState(VideoState.playing))
    this.vimeoPlayer.on('pause',()=>this.updateVideoState(VideoState.paused))
    this.vimeoPlayer.on('ended',()=>this.updateVideoState(VideoState.finished))*/
  }


  protected getContainerBounds(){
    return this.container.nativeElement.getBoundingClientRect() 
  }

  updateBounds ( size:{width:number, height:number} ) {

    this.width = size.width
    this.height = size.height

    /*this.iframe.nativeElement.setAttribute ( 'width' , size.width + 'px' )
    this.iframe.nativeElement.setAttribute ( 'height' , (size.width / this.getRatio()) + 'px' )*/
  }

  updateWidth ( width:number ) {
    this.updateBounds ( {width, height: width / this.getRatio()} )
  }

  onEvent ( eventName:string, event:Event ) {

    console.log('video event "%s"', eventName, event)

  }

}
