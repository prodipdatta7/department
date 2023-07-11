import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppCountDownTimerComponent } from './components/app-count-down-timer/app-count-down-timer.component';

@NgModule({
    declarations: [ImageViewerComponent, AppCountDownTimerComponent],
    imports: [CommonModule, MatDialogModule, FlexModule, MatButtonModule, MatIconModule],
    exports: [AppCountDownTimerComponent],
    entryComponents: [ImageViewerComponent],
})
export class SharedModule {}
