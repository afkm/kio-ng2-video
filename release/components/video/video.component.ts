import { Component, Input, Output, QueryList, EventEmitter, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { RoutableComponent, ContentDataComponent, ContentLoaderDirective, ResizingService } from 'kio-ng2-component-routing'
import { VideoState } from '../../enums/video-state.enum'
import { KioOEmbed, KioOEmbedData } from 'kio-ng2-data'
// noinspection TypeScriptCheckImport
import * as VimeoPlayer from "@vimeo/player/dist/player.js";
import { Player } from '@vimeo/player'


declare const VimeoPlayer:{new (el:HTMLElement,opts:any):Player}

@RoutableComponent({
  selector: 'publication-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  encapsulation: ViewEncapsulation.None,
  queryable: {
    type: 'src' 
  }
})
export class VideoComponent extends ContentDataComponent {

  videoState:VideoState=VideoState.loading

  @Input('playing') set playing ( playing:boolean ) {
    this.stopped = playing === false
    if ( playing === true ) {
      this.playVideo()
    }
  }

  @Output()
  stateChanges:EventEmitter<VideoState>=new EventEmitter()

  stopped:boolean=true

  protected vimeoPlayer:Player

  
  protected updateVideoState ( nextState:VideoState ) {
    this.videoState = nextState
    this.stateChanges.emit(nextState)
    if ( nextState === VideoState.finished ) {
      this.stopped = true
    }
  }

  onUpdate(){
    super.onUpdate()

    this.initVimeo()

    if (this.node && this.node.modifiers) {
      this.fitToBox = this.node.modifiers.indexOf('fit-to-box') !== -1
    }
  }

  playVideo ( ) {
    if ( !this.vimeoPlayer ) {
      this.stateChanges.filter ( s => s === VideoState.ready ).take(1).subscribe ( s => {
        this.playVideo()
      } )      
    } else {
      this.vimeoPlayer.ready().then ( () => this.vimeoPlayer.play() )
      .catch ( error => console.error(error) )
    }
  }

  initVimeo(){
    this.vimeoPlayer = new VimeoPlayer(this.container.nativeElement,{
      id: this.data.oEmbed.raw.video_id
    })
    this.vimeoPlayer.on('loaded',()=>this.updateVideoState(VideoState.ready))
    this.vimeoPlayer.on('play',()=>this.updateVideoState(VideoState.playing))
    this.vimeoPlayer.on('pause',()=>this.updateVideoState(VideoState.paused))
    this.vimeoPlayer.on('ended',()=>this.updateVideoState(VideoState.finished))
  }

  getRatio ():number { 
    if ( this.node.headers ) 
    { 
      return this.node.headers.ratio || 1 
    } 
    return 1 
  }

  /**
   * reference to container element in template
   * @param {ElementRef} 'container' container element
   */
  @ViewChild('container') container:ElementRef
  @ViewChild('iframe') iframe:ElementRef
  @ViewChild('iframe') iframeQuery:QueryList<ElementRef>
  

  getContainerBounds(){
    return this.container.nativeElement.getBoundingClientRect() 
  }

  resizeContent () {
    const bounds = this.container.nativeElement.getBoundingClientRect()
    this.iframe.nativeElement.setAttribute ( 'width' , bounds.width + 'px' )
    this.iframe.nativeElement.setAttribute ( 'height' , (bounds.width / this.getRatio()) + 'px' )
  }

  protected onResize () {
    this.resizeContent()
  }

  fitToBox:boolean = false

}
