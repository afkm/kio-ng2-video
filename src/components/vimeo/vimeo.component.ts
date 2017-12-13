import { Component, Input, Output, QueryList, EventEmitter, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { RoutableComponent, ContentDataComponent, ContentLoaderDirective, ResizingService } from 'kio-ng2-component-routing'
import { VideoState } from '../../enums/video-state.enum'
import { KioOEmbed, KioOEmbedData } from 'kio-ng2-data'
import { AbstractVideoComponent } from '../abstract/abstract.component'

// noinspection TypeScriptCheckImport
import * as VimeoPlayer from "@vimeo/player/dist/player.js";
import { Player } from '@vimeo/player'


declare const VimeoPlayer:{new (el:HTMLElement,opts:any):Player}

@RoutableComponent({
  selector: 'publication-vimeo-player',
  templateUrl: './vimeo.component.html',
  styleUrls: ['./vimeo.component.scss'],
  encapsulation: ViewEncapsulation.None,
  queryable: {
    type: 'src' 
  }
})
export class VimeoVideoComponent extends AbstractVideoComponent {

  protected vimeoPlayer:Player

  
  public playVideo ( ) {
    if ( !this.vimeoPlayer ) {
      this.stateChanges.filter ( s => s === VideoState.ready ).take(1).subscribe ( s => {
        this.playVideo()
      } )      
    } else {
      this.vimeoPlayer.ready().then ( () => this.vimeoPlayer.play() )
      .catch ( error => console.error(error) )
    }
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
