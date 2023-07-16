import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminSpecificService } from '../../services/admin-specific.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-course-details',
    templateUrl: './course-details.component.html',
    styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
    course: any;
    loading = false;
    form!: FormGroup;
    mode = 'read';
    Id: any;
    SEMESTERS = environment.SEMESTERS;
    DEPARTMENTS = environment.DEPARTMENTS;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private adminService: AdminSpecificService,
        private formBuilder: FormBuilder
    ) {}
    ngOnInit(): void {
        this.loading = true;
        this.Id = this.route.snapshot.paramMap.get('id');
        this.mode = this.route.snapshot.queryParamMap.get('mode') || 'read';
        this.adminService.getCourseById(this.Id).subscribe((res: any) => {
            if (res?.success) {
                this.course = res.course;
                this.initForm();
            }
            this.loading = false;
        });
    }
    initForm() {
        this.form = this.formBuilder.group({
            courseCode: [this.course.courseCode],
            courseName: [this.course.courseName],
            courseCredits: [this.course.courseCredits],
            courseContactHours: [this.course.courseContactHours],
            courseCoverageDepartment: [this.course.courseCoverageDepartment],
            courseCoverageSemester: [this.course.courseCoverageSemester],
        });
    }
    back() {
        this.router.navigate(['courses'], { relativeTo: this.route.parent });
    }

    update() {
        const payload = this.form.value;
        this.adminService.updateCourse(this.Id, payload).subscribe((res: any) => {
            if (res) {
                this.back();
            }
        });
    }
}
