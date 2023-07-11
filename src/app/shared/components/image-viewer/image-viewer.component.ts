import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-image-viewer',
    templateUrl: './image-viewer.component.html',
    styleUrls: ['./image-viewer.component.scss'],
})
export class ImageViewerComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ImageViewerComponent>) {}
    imgSrc: any;
    ngOnInit(): void {
        this.imgSrc = this.data.imgSrc;
    }
    close() {
        this.dialogRef.close();
    }
}
