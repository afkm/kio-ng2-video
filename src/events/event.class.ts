import { VideoState } from '../enums/video-state.enum'

export class VideoEvent <K extends keyof typeof VideoState> extends Event {

  constructor ( readonly type:K ) {
    super(type)
  }


}
