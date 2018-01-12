import { Component, Renderer2, EventEmitter, HostBinding, ElementRef, Injector, Input, Output } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { RoutableComponent, ContentDataComponent, ContentLoaderDirective, ResizingService } from 'kio-ng2-component-routing'
import { KioVideoData } from '../../interfaces/video-node'
import { VideoState } from '../../enums/video-state.enum'
import { VideoData } from 'kio-ng2-ctn'
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
  events:EventEmitter<VideoEvent<keyof typeof VideoState>>=new EventEmitter()

  @Output()
  stateChanges=this.events.map ( event => VideoState[event.type] )


  @Input()
  controls:boolean=false

  @Input()
  autoplay:boolean=false

  @Input()
  loop:boolean=false


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
    this.videoType = this.videoTypeByMimeType(this.node.headers.mimeType)
    console.log('identified video of type', this.videoType)
    super.onNodeUpdate()
  }


  onUpdate () {
    super.onUpdate()
    console.log('video component :: data udpate', this)
  }

  ngOnInit () {
    console.log('init video component', this)
  }

  ngAfterViewInit () {
    super.ngAfterViewInit()
    this.playing = this.autoplay
  }

  setData ( data:any ) {

    super.setData(data)

  }

  onChildStateChange ( videoState:VideoState ) {

    console.log('child video element changed:', videoState )
    const nextStateName = VideoState[videoState] as keyof typeof VideoState
    this.events.emit(new VideoEvent(nextStateName))

  }

  protected videoTypeByMimeType ( mimeType:string ):VideoType {

    const [ mediaType, mime ] = mimeType.split('/')

    if ( mime === 'vimeo' ) {

      return VideoType.vimeo

    }

    return VideoType.native

  }

  protected assignVideoData ( data:KioVideoData ) {
    this.videoData = data    
  }

  protected processBackendResponse ( response:any ) {
    this.assignVideoData(response)
  }

  protected onResize () {
    this.resizeContent()
  }

  protected updateBounds ( size:{width:number, height:number} ) {}

}