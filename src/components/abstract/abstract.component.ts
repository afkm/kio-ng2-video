import { Observable } from 'rxjs/Observable'
import { Component, Input, Output, QueryList, EventEmitter, ViewChild, ElementRef, HostBinding, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { RoutableComponent, ContentDataComponent, ContentLoaderDirective, ResizingService } from 'kio-ng2-component-routing'
import { VideoState } from '../../enums/video-state.enum'
import { VideoType } from '../../enums/video-type.enum'
import { KioOEmbed, KioOEmbedData, KioContentModel } from 'kio-ng2-data'
import { KioVideoData } from '../../interfaces/video-node'


export class AbstractVideoComponent <T extends keyof typeof VideoType> implements AfterViewInit {

  @Input()
  autoplay:boolean

  @Input()
  loop:boolean

  @Input()
  controls:boolean

  @Input()
  muted:boolean

  videoType:T

  videoState:VideoState=VideoState.loading

  ratio:number

  @Output()
  stateChanges:EventEmitter<VideoState>=new EventEmitter()

  stopped:boolean=true

  fitToBox:boolean=false

  @Input()
  videoData:KioVideoData

  @HostBinding('style.width.%') width:number=100
  @HostBinding('style.height.%') height:number=100

  @Input('playing') set playing ( playing:boolean ) {
    this.stopped = playing === false
    if ( playing === true ) {
      this.playVideo()
    }
  }

  @Output('playing') playingEvents=this.stateChanges.map ( (state:VideoState):boolean => {
    return state === VideoState.playing
  } )

  /**
   * reference to container element in template
   * @param {ElementRef} 'container' container element
   */
  @ViewChild('container') container:ElementRef
  @ViewChild('iframe') iframe:ElementRef
  @ViewChild('iframe') iframeQuery:QueryList<ElementRef>

  protected updateVideoState ( nextState:VideoState ) {
    this.videoState = nextState
    this.stateChanges.emit(nextState)
    if ( nextState === VideoState.finished ) {
      this.stopped = true
    }
  }

  getRatio ():number {
    return this.ratio
  }

  resizeContent () {

    const size = this.getContainerBounds()
    //this.updateBounds ( size )

  }

  protected onResize () {
    this.resizeContent()
  }

  protected updateBounds ( size:{width:number, height:number} ) {

    this.width = size.width
    this.height = size.height

  }

  public playVideo ():void {}

  protected prepareVideo ():void {}

  protected getContainerBounds ():{width: number, height:number} {
    return undefined
  }

  ngAfterViewInit() {
    process.nextTick(()=>{
      this.prepareVideo()
      //this.updateBounds( this.videoData.raw )
    })
  }


}
