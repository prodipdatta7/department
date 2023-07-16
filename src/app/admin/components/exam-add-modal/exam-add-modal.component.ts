import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ExamService } from 'src/app/examination/services/exam.service';

@Component({
    selector: 'app-exam-add-modal',
    templateUrl: './exam-add-modal.component.html',
    styleUrls: ['./exam-add-modal.component.scss'],
})
export class ExamAddModalComponent implements OnInit {
    examForm!: FormGroup;
    STATUS = ['UPCOMMING', 'PAST'];
    YEAR = ['1st', '2nd', '3rd', '4th'];
    SEMESTER = ['1st', '2nd'];
    CENTRE = ['Academic Building', 'Administrative Building'];
    constructor(
        private dialogRef: MatDialogRef<ExamAddModalComponent>,
        private examService: ExamService,
        private formBuilder: FormBuilder
    ) {}
    ngOnInit(): void {
        this.examForm = this.formBuilder.group({
            examName: ['', [Validators.required]],
            examDate: ['', Validators.required],
            registrationOpenDate: ['', [Validators.required]],
            registrationCloseDate: ['', [Validators.required]],
            examCentre: ['', [Validators.required]],
            semester: ['', [Validators.required]],
            year: ['', [Validators.required]],
            status: ['', [Validators.required]],
            courses: this.formBuilder.array([]),
        });
    }

    onSubmit() {}
}
