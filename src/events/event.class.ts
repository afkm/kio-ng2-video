import { VideoState } from '../enums/video-state.enum'

export class VideoEvent <K extends keyof typeof VideoState> extends CustomEvent {

  constructor ( readonly type:K ) {
    super(type)
  }


}
