import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminSpecificService } from '../../services/admin-specific.service';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/services/common.service';

@Component({
    selector: 'app-course-add-modal',
    templateUrl: './course-add-modal.component.html',
    styleUrls: ['./course-add-modal.component.scss'],
})
export class CourseAddModalComponent {
    declare courseForm: FormGroup;
    actionFailed = false;
    SEMESTERS = environment.SEMESTERS;
    DEPARTMENTS = environment.DEPARTMENTS;
    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<CourseAddModalComponent>,
        private adminService: AdminSpecificService,
        private commonService: CommonService
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.courseForm = this.formBuilder.group({
            courseCode: ['', [Validators.required]],
            courseName: ['', [Validators.required]],
            courseCredits: ['', [Validators.required, Validators.min(1)]],
            courseContactHours: ['', [Validators.required, Validators.min(1)]],
            courseCoverageSemester: ['', [Validators.required]],
            courseCoverageDepartment: ['', [Validators.required]],
        });
        if (this.data.mode === 'update') {
            this.courseForm.get('courseCode')?.setValue(this.data.course.courseCode);
            this.courseForm.get('courseName')?.setValue(this.data.course.courseName);
            this.courseForm.get('courseCredits')?.setValue(this.data.course.courseCredits);
            this.courseForm.get('courseContactHours')?.setValue(this.data.course.courseContactHours);
            this.courseForm.get('courseCoverageSemester')?.setValue(this.data.course.courseCoverageSemester);
            this.courseForm.get('courseCoverageDepartment')?.setValue(this.data.course.courseCoverageDepartment);
        }
    }
    onClose(text?: string) {
        this.dialogRef.close(text);
    }
    onSave() {
        this.actionFailed = false;
        const payload = this.courseForm.value;
        if (this.data.mode === 'update') {
            const Id = this.data.course.id;
            this.adminService.updateCourse(Id, payload).subscribe(
                () => {
                    this.commonService.openSnackbar('Success!! Course updated.');
                    this.onClose('success');
                },
                () => {
                    this.commonService.openSnackbar('Error! Course did not update.');
                    this.actionFailed = true;
                }
            );
        } else {
            this.adminService.addCourse(payload).subscribe(
                () => {
                    this.commonService.openSnackbar('Success!! Course added.');
                    this.onClose('success');
                },
                (error: any) => {
                    this.commonService.openSnackbar('Error! Course did not add.');
                    if (error) {
                        this.actionFailed = true;
                    }
                }
            );
        }
    }
}
