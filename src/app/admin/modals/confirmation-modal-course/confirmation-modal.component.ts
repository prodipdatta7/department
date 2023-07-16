import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExamService } from 'src/app/examination/services/exam.service';
import { CommonService } from 'src/app/services/common.service';
import { AdminSpecificService } from '../../services/admin-specific.service';

@Component({
    selector: 'app-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalCourseComponent implements OnInit {
    loading = false;
    constructor(
        public dialogRef: MatDialogRef<ConfirmationModalCourseComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private adminService: AdminSpecificService,
        private commonService: CommonService
    ) {}
    ngOnInit(): void {}
    onDelete() {
        this.loading = true;
        this.adminService.deleteCourse(this.data.id).subscribe((res: any) => {
            if (res?.success) {
                this.dialogRef.close('deleted');
            } else {
                this.commonService.openSnackbar('Something went wrong! Try Again...');
            }
            this.loading = false;
        });
    }
}
