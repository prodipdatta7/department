import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AdminSpecificService } from '../../services/admin-specific.service';
import { MatDialog } from '@angular/material/dialog';
import { CourseAddModalComponent } from '../../modals/course-add-modal/course-add-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
    courses = [];
    dataSource!: MatTableDataSource<any>;
    columnDefs = [
        { field: 'courseCode', label: 'Course Code', show: true },
        { field: 'courseName', label: 'Course Name', show: true },
        { field: 'courseCredits', label: 'Course Credits', show: true },
        { field: 'courseCoverageSemester', label: 'Semester', show: true },
    ];
    displayedColumns = this.columnDefs.map((column) => column.field);
    dataLoaded = false;
    constructor(private adminService: AdminSpecificService, private dialog: MatDialog) {}
    @ViewChild('paginator') paginator!: MatPaginator;
    ngAfterViewInit() {
        this.dataSource = new MatTableDataSource<any>(this.courses);
        this.dataSource.paginator = this.paginator;
        this.dataLoaded = true;
    }
    ngOnInit(): void {
        this.dataLoaded = false;
        this.getAllCourses();
    }

    async getAllCourses() {
        console.log('ngOnInit');
        await this.adminService.getCourses().subscribe(async (response: any) => {
            this.courses = (await response?.courses) || [];
            this.dataSource = new MatTableDataSource<any>(this.courses);
            this.dataSource.paginator = this.paginator;
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
    }

    ngOnDestroy(): void {}
}
