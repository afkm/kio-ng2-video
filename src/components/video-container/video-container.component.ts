import { Component } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { RoutableComponent, ContentDataComponent, ContentLoaderDirective, ResizingService } from 'kio-ng2-component-routing'

import { VideoType } from '../../enums/video-type.enum'

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
export class VideoComponent extends ContentDataComponent {

  videoType:Observable<VideoType>=this.onData.map ( (data:any):VideoType => {
    return this.videoTypeByMimeType(data.headers['mimeType'])
  } )

  private videoTypeSubscription=this.videoType.subscribe ( videoType => {
    console.log('video type: ', videoType)
  } )

  onNodeUpdate () {
    super.onNodeUpdate()
    console.log('video component :: node udpate', this)
  }


  onUpdate () {
    super.onUpdate()
    console.log('video component :: data udpate', this)
  }

  ngOnInit () {

    console.log('init video component', this)

  }

  protected videoTypeByMimeType ( mimeType:string ):VideoType {

    const [ mediaType, mime ] = mimeType.split('/')

    if ( mime === 'vimeo' ) {

      return VideoType.vimeo

    }

    return VideoType.native

  }

}