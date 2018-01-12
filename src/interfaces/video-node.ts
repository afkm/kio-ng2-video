import { KioContentData } from 'kio-ng2-data'

export interface KioVideoData {

  raw?: {
    link: string
    width: number
    height: number
    duration: number
  }

  oEmbed?: {
    raw: {
      video_id: string
      [key: string]: any
    }
  }

  headers?: {
    mimeType: string
    ratio: number
    isVimeo: boolean
    isVideo: boolean
    [key:string]: any
  }

}