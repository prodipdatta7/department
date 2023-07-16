import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExamService } from 'src/app/examination/services/exam.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
    selector: 'app-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent implements OnInit {
    loading = false;
    constructor(
        public dialogRef: MatDialogRef<ConfirmationModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private examService: ExamService,
        private commonService: CommonService
    ) {}
    ngOnInit(): void {}
    onDelete() {
        this.loading = true;
        this.examService.deleteById(this.data.examId).subscribe((res: any) => {
            if (res?.success) {
                this.dialogRef.close('deleted');
            } else {
                this.commonService.openSnackbar('Something went wrong! Try Again...');
            }
            this.loading = false;
        });
    }
}
