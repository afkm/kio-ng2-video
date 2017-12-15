import { Component, Input, Output, QueryList, EventEmitter, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { RoutableComponent, ContentDataComponent, ContentLoaderDirective, ResizingService } from 'kio-ng2-component-routing'
import { VideoState } from '../../enums/video-state.enum'
import { KioOEmbed, KioOEmbedData, KioContentModel } from 'kio-ng2-data'

@Component({
  selector: 'abstract-video',
  template: ''
})
export abstract class AbstractVideoComponent extends ContentDataComponent {

  videoState:VideoState=VideoState.loading

  @Output()
  stateChanges:EventEmitter<VideoState>=new EventEmitter()

  stopped:boolean=true

  fitToBox:boolean=false
  
  @Input('playing') set playing ( playing:boolean ) {
    this.stopped = playing === false
    if ( playing === true ) {
      this.playVideo()
    }
  }

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


  onUpdate(){
    super.onUpdate()

    this.prepareVideo()

    if ( this.node && this.node.modifiers ) {
      this.fitToBox = this.node.modifiers.indexOf('fit-to-box') !== -1
    }

  }

  getRatio ():number { 
    if ( this.node.headers ) 
    { 
      return this.node.headers.ratio || 1 
    } 
    return 1 
  }

  resizeContent () {

    const size = this.getContainerBounds()
    this.updateBounds ( size )

  }

  protected onResize () {
    this.resizeContent()
  }

  protected abstract updateBounds ( size:{width:number, height:number} )

  public abstract playVideo ():void

  protected abstract prepareVideo ():void

  protected abstract getContainerBounds ():{width: number, height:number}

}