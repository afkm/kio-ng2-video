import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponent } from './components/video/video.component';
import { KioNg2ComponentRoutingModule } from 'kio-ng2-component-routing';
import { KioCtnModule } from 'kio-ng2-ctn';
//export { VideoState } from './enums/video-state.enum'
var VideoModule = (function () {
    function VideoModule() {
    }
    return VideoModule;
}());
export { VideoModule };
VideoModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule, KioNg2ComponentRoutingModule, KioCtnModule
                ],
                declarations: [VideoComponent],
                entryComponents: [VideoComponent],
                exports: [VideoComponent, KioNg2ComponentRoutingModule, KioCtnModule]
            },] },
];
/** @nocollapse */
VideoModule.ctorParameters = function () { return []; };
//# sourceMappingURL=video.module.js.map