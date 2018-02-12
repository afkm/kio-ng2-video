import { Component, Input, Output, QueryList, EventEmitter, ViewChild, ElementRef, ViewEncapsulation, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { RoutableComponent, ContentDataComponent, ContentLoaderDirective, ResizingService } from 'kio-ng2-component-routing'
import { VideoState } from '../../enums/video-state.enum'
import { VideoType } from '../../enums/video-type.enum'
import { KioOEmbed, KioOEmbedData } from 'kio-ng2-data'
import { AbstractVideoComponent } from '../abstract/abstract.component'

// noinspection TypeScriptCheckImport
import * as VimeoPlayer from "@vimeo/player/dist/player.js";
import { Player } from '@vimeo/player'


declare const VimeoPlayer:{new (el:HTMLElement,opts:any):Player}

@Component({
  moduleId: module.id,
  selector: 'publication-vimeo-player',
  templateUrl: './vimeo.component.html',
  styleUrls: ['./vimeo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VimeoVideoComponent extends AbstractVideoComponent<'vimeo'> implements OnChanges {


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
    this.vimeoPlayer = new VimeoPlayer(this.container.nativeElement,{
      id: this.videoData.oEmbed.raw.video_id
    })
    this.vimeoPlayer.on('loaded',()=>this.updateVideoState(VideoState.ready))
    this.vimeoPlayer.on('play',()=>this.updateVideoState(VideoState.playing))
    this.vimeoPlayer.on('pause',()=>this.updateVideoState(VideoState.paused))
    this.vimeoPlayer.on('ended',()=>this.updateVideoState(VideoState.finished))

    if ( this.autoplay ) {

      this.playVideo()

    }
  }


  protected getContainerBounds(){
    return this.container.nativeElement.getBoundingClientRect() 
  }

  updateBounds ( size:{width:number, height:number} ) {
    this.iframe.nativeElement.setAttribute ( 'width' , size.width + 'px' )
    this.iframe.nativeElement.setAttribute ( 'height' , (size.width / this.getRatio()) + 'px' )
  }

  ngOnChanges(changes:SimpleChanges) {

    const keys = Object.keys(changes)
    if ( 'autoplay' in changes ) {
      if ( changes['autoplay'].currentValue ) {
        this.playVideo ()
      } else if ( this.vimeoPlayer ) {
        this.vimeoPlayer.pause()
      }
    }
    

  }

}
