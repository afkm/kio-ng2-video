import { QueryList, EventEmitter, ElementRef } from '@angular/core';
import { ContentDataComponent } from 'kio-ng2-component-routing';
import { VideoState } from '../../enums/video-state.enum';
import { Player } from '@vimeo/player';
export declare class VideoComponent extends ContentDataComponent {
    videoState: VideoState;
    playing: boolean;
    stateChanges: EventEmitter<VideoState>;
    stopped: boolean;
    protected vimeoPlayer: Player;
    protected updateVideoState(nextState: VideoState): void;
    onUpdate(): void;
    playVideo(): void;
    initVimeo(): void;
    getRatio(): number;
    /**
     * reference to container element in template
     * @param {ElementRef} 'container' container element
     */
    container: ElementRef;
    iframe: ElementRef;
    iframeQuery: QueryList<ElementRef>;
    getContainerBounds(): any;
    resizeContent(): void;
    protected onResize(): void;
    fitToBox: boolean;
}
