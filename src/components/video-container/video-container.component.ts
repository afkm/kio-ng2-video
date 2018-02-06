import { Component, Renderer2, EventEmitter, HostBinding, ElementRef, Injector, Input, Output } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { RoutableComponent, ContentDataComponent, ContentLoaderDirective, ResizingService } from 'kio-ng2-component-routing'
import { KioVideoData } from '../../interfaces/video-node'
import { VideoState } from '../../enums/video-state.enum'
import { VideoEvent } from '../../events/event.class'


import { VideoType } from '../../enums/video-type.enum'
import { AbstractVideoComponent } from '../abstract/abstract.component'


@RoutableComponent({
  selector: 'publication-video',
  templateUrl: 'video-container.component.html',
  styleUrls: ['video-container.component.scss'],
  queryable: {
    type: 'src',
    modifiers: {
      contains: [ 'video' ]
    }
  }
})
export class VideoWrapperComponent extends ContentDataComponent {

  hostElement:ElementRef=this.injector.get(ElementRef)

  @Output()
  events:EventEmitter<CustomEvent>=new EventEmitter()

  @Output()
  stateChanges=this.events.map ( event => VideoState[event.type] )


  @Input()
  controls:boolean=false

  @Input()
  autoplay:boolean=false

  @Input()
  loop:boolean=false

  @Input()
  muted:boolean=false

  @Input()
  poster:string


  @Input('playing') set playing ( playing:boolean ) {
    this.stopped = playing === false
    if ( playing === true ) {
      this.playVideo()
    }
  }

  @Output('playing') playingEvents=this.stateChanges.map ( (state:VideoState):boolean => {
    return state === VideoState.playing
  } )

  videoData:KioVideoData

  stopped:boolean

  containerElement:ElementRef=this.injector.get(ElementRef)

  videoType:VideoType

  @HostBinding('class.fit__to__box')
  fitToBox:boolean=true

  private _renderer:Renderer2=this.injector.get(Renderer2)


  playVideo () {

  }

  getContainerBounds ():{width:number,height:number} {
    const bounds = this.hostElement.nativeElement.getBoundingClientRect()
    return {
      width: bounds.width,
      height: bounds.height
    }
  }

  /** content component inheritance */

  resizeContent () {

    const size = this.getContainerBounds()
    this.updateBounds ( size )

  }

  onNodeUpdate () {

    const mimeType = this.node.headers.mimeType

    if ( mimeType ) {

      this.videoType = this.videoTypeByMimeType(mimeType)

    }

    super.onNodeUpdate()

  }


  ngAfterViewInit () {
    super.ngAfterViewInit()
    this.playing = this.autoplay
  }

  setData ( data:any ) {

    this.videoData = data

    if ( typeof this.videoType === undefined ) {
      // has not been set on node update, must be headers from data then
      //this.videoType = this.videoTypeByMimeType ( data )
      this.videoType = this.videoTypeByMimeType(this.videoData.headers.mimeType)
    }

    super.setData(data)

  }

  onChildStateChange ( videoState:VideoState ) {

    const nextStateName = VideoState[videoState] as keyof typeof VideoState
    const event = new CustomEvent(nextStateName)
    this.events.emit(event)

  }

  protected videoTypeByMimeType ( mimeType:string ):VideoType {

    const [ mediaType, mime ] = mimeType.split('/')

    if ( mime === 'vimeo' ) {

      return VideoType.vimeo

    }

    return VideoType.native

  }

  protected readDataResponse ( response:Response ) {
    return response
  }

  protected onResize () {
    this.resizeContent()
  }

  protected updateBounds ( size:{width:number, height:number} ) {}

}
