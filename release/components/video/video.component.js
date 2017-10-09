var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Input, Output, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { RoutableComponent, ContentDataComponent } from 'kio-ng2-component-routing';
import { VideoState } from '../../enums/video-state.enum';
// noinspection TypeScriptCheckImport
import * as VimeoPlayer from "@vimeo/player/dist/player.js";
var VideoComponent = (function (_super) {
    __extends(VideoComponent, _super);
    function VideoComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.videoState = VideoState.loading;
        _this.stateChanges = new EventEmitter();
        _this.stopped = true;
        _this.fitToBox = false;
        return _this;
    }
    Object.defineProperty(VideoComponent.prototype, "playing", {
        set: function (playing) {
            this.stopped = playing === false;
            if (playing === true) {
                this.playVideo();
            }
        },
        enumerable: true,
        configurable: true
    });
    VideoComponent.prototype.updateVideoState = function (nextState) {
        this.videoState = nextState;
        this.stateChanges.emit(nextState);
        if (nextState === VideoState.finished) {
            this.stopped = true;
        }
    };
    VideoComponent.prototype.onUpdate = function () {
        _super.prototype.onUpdate.call(this);
        this.initVimeo();
        if (this.node && this.node.modifiers) {
            this.fitToBox = this.node.modifiers.indexOf('fit-to-box') !== -1;
        }
    };
    VideoComponent.prototype.playVideo = function () {
        var _this = this;
        if (!this.vimeoPlayer) {
            this.stateChanges.filter(function (s) { return s === VideoState.ready; }).take(1).subscribe(function (s) {
                _this.playVideo();
            });
        }
        else {
            this.vimeoPlayer.ready().then(function () { return _this.vimeoPlayer.play(); })
                .catch(function (error) { return console.error(error); });
        }
    };
    VideoComponent.prototype.initVimeo = function () {
        var _this = this;
        this.vimeoPlayer = new VimeoPlayer(this.container.nativeElement, {
            id: this.data.oEmbed.raw.video_id
        });
        this.vimeoPlayer.on('loaded', function () { return _this.updateVideoState(VideoState.ready); });
        this.vimeoPlayer.on('play', function () { return _this.updateVideoState(VideoState.playing); });
        this.vimeoPlayer.on('pause', function () { return _this.updateVideoState(VideoState.paused); });
        this.vimeoPlayer.on('ended', function () { return _this.updateVideoState(VideoState.finished); });
    };
    VideoComponent.prototype.getRatio = function () {
        if (this.node.headers) {
            return this.node.headers.ratio || 1;
        }
        return 1;
    };
    VideoComponent.prototype.getContainerBounds = function () {
        return this.container.nativeElement.getBoundingClientRect();
    };
    VideoComponent.prototype.resizeContent = function () {
        var bounds = this.container.nativeElement.getBoundingClientRect();
        this.iframe.nativeElement.setAttribute('width', bounds.width + 'px');
        this.iframe.nativeElement.setAttribute('height', (bounds.width / this.getRatio()) + 'px');
    };
    VideoComponent.prototype.onResize = function () {
        this.resizeContent();
    };
    return VideoComponent;
}(ContentDataComponent));
VideoComponent.propDecorators = {
    'playing': [{ type: Input, args: ['playing',] },],
    'stateChanges': [{ type: Output },],
    'container': [{ type: ViewChild, args: ['container',] },],
    'iframe': [{ type: ViewChild, args: ['iframe',] },],
    'iframeQuery': [{ type: ViewChild, args: ['iframe',] },],
};
VideoComponent = __decorate([
    RoutableComponent({
        selector: 'publication-video',
        templateUrl: './video.component.html',
        styleUrls: ['./video.component.css'],
        encapsulation: ViewEncapsulation.None,
        queryable: {
            type: 'src'
        }
    })
], VideoComponent);
export { VideoComponent };
//# sourceMappingURL=video.component.js.map