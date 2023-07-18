import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminSpecificService} from '../../services/admin-specific.service';
import {MatDialog} from '@angular/material/dialog';
import {CourseAddModalComponent} from '../../modals/course-add-modal/course-add-modal.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationModalCourseComponent} from '../../modals/course-delete-confirmation-modal/confirmation-modal.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged, startWith} from 'rxjs';

export interface ICourseModel {
    courseId: string;
    courseName: string;
    courseCredits: Number;
    courseContactHours: Number;
    courseCoverageSemester: string;
    courseCoverageDepartment: string;
    _id: string;
}

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
    courses: any[] = [];
    dataLoaded = false;
    search!: FormGroup;
    constructor(
        private adminService: AdminSpecificService,
        private dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) {}
    ngOnInit(): void {
        this.dataLoaded = false;
        this.getAllCourses();
        this.initSearchForm();
    }

    initSearchForm() {
        this.search = this.formBuilder.group({
            Name: [''],
        });
        this.search
            .get('Name')
            ?.valueChanges.pipe(startWith(''), debounceTime(700), distinctUntilChanged())
            .subscribe((text: string) => {
                this.getAllCourses({ courseName: text });
            });
    }

    getAllCourses(query?: any) {
        this.adminService.getCourses(query).subscribe((response: any) => {
            this.courses = response?.body?.courses || [];
            this.dataLoaded = true;
        });
    }
    selectCourse(course: any) {}

    addCourse() {
        const data = {
            title: 'Add Course',
            mode: 'create',
            autoFocus: false,
            restoreFocus: false,
            addButton: 'Save',
            cancelButton: 'Cancel',
        };
        const dialogRef = this.dialog.open(CourseAddModalComponent, {
            data: data,
        });
        dialogRef.afterClosed().subscribe((res: any) => {
            if (res === 'success') {
                this.dataLoaded = false;
                this.getAllCourses();
            }
        });
    }
    seeDetails(id: any) {
        this.router.navigate([`courses/${id}`], { relativeTo: this.route.parent });
    }
    editCourse(id: any) {
        this.router.navigate([`courses/${id}`], {
            relativeTo: this.route.parent,
            queryParams: {
                mode: 'update',
            },
            queryParamsHandling: 'merge',
        });
    }
    deleteCourse(id: any) {
        const dialogRef = this.dialog.open(ConfirmationModalCourseComponent, {
            data: {
                id: id,
                title: 'Course Delete Modal',
            },
        });
        dialogRef.afterClosed().subscribe((res: any) => {
            if (res === 'deleted') {
                this.dataLoaded = false;
                this.getAllCourses();
            }
        });
    }
    toggleRowExpansion(id: any) {
        this.courses.forEach((course) => {
            if (course._id === id) course.isExpanded = !course.isExpanded;
            else course.isExpanded = false;
        });
    }

    ngOnDestroy(): void {}
}
