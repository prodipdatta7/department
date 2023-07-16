import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExamService } from 'src/app/examination/services/exam.service';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-user-delete-confirmation-modal',
    templateUrl: './user-delete-confirmation-modal.component.html',
    styleUrls: ['./user-delete-confirmation-modal.component.scss'],
})
export class UserDeleteConfirmationModalComponent {
    loading = false;
    constructor(
        public dialogRef: MatDialogRef<UserDeleteConfirmationModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private userService: UserService,
        private commonService: CommonService
    ) {}
    onDelete() {
        this.loading = true;
        this.userService.deleteUserById(this.data.id).subscribe((res: any) => {
            if (res?.success) {
                this.dialogRef.close('deleted');
            } else {
                this.commonService.openSnackbar('Something went wrong! Try Again...');
            }
            this.loading = false;
        });
    }
}
