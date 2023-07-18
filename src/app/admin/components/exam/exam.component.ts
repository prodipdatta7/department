import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ExamService } from 'src/app/examination/services/exam.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationModalComponent } from '../../modals/confirmation-modal/confirmation-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { startWith, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
    selector: 'app-exam',
    templateUrl: './exam.component.html',
    styleUrls: ['./exam.component.scss'],
})
export class ExamComponent implements OnInit {
    @ViewChild('paginator') paginator!: MatPaginator;
    loading = false;
    examList: any[] = [];
    search!: FormGroup;
    constructor(
        private examService: ExamService,
        private dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) {}
    ngOnInit(): void {
        this.loading = true;
        this.initSearchForm();
        this.getExams();
    }
    initSearchForm() {
        this.search = this.formBuilder.group({
            Name: [''],
        });
        this.search
            .get('Name')
            ?.valueChanges.pipe(startWith(''), debounceTime(700), distinctUntilChanged())
            .subscribe((text: string) => {
                this.getExams({ examName: text });
            });
    }

    getExams(query?: any) {
        this.examService.getUpcommingExaminations(query).subscribe((res: any) => {
            if (res?.body?.success) {
                this.examList = res.body.examList;
            }
            this.loading = false;
        });
    }
    addExam() {
        this.router.navigate(['create-exam'], { relativeTo: this.route.parent });
    }
    seeDetails(id: any) {
        this.router.navigate([`examination/details/${id}`], {
            queryParams: {
                user: 'admin',
            },
            queryParamsHandling: 'merge',
        });
    }
    editExam(id: any) {
        this.router.navigate([`examination/update/${id}`], { relativeTo: this.route.parent });
    }
    deleteExam(id: any) {
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
            data: {
                examId: id,
                title: 'Examination Delete Modal',
            },
        });
        dialogRef.afterClosed().subscribe((res : any) => {
            if(res === 'deleted') {
                this.getExams();
            }
        })
    }
    toggleRowExpansion(id: any) {
        this.examList.forEach((exam) => {
            if (exam._id === id) exam.isExpanded = !exam.isExpanded;
            else exam.isExpanded = false;
        });
    }
}
