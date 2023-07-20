import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { ExamService } from 'src/app/examination/services/exam.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
    selector: 'app-create-exam',
    templateUrl: './create-exam.component.html',
    styleUrls: ['./create-exam.component.scss'],
})
export class CreateExamComponent {
    examForm!: FormGroup;
    allCourses: any[] = [];
    filteredCourses!: Observable<any[]> | undefined;
    STATUS = ['UPCOMMING', 'PAST'];
    YEAR = ['1st', '2nd', '3rd', '4th'];
    SEMESTER = ['1st', '2nd'];
    CENTRE = ['Academic Building', 'Administrative Building'];
    submitted = false;
    loading = false;
    examId: any;
    mode = 'create';
    constructor(
        private examService: ExamService,
        private formBuilder: FormBuilder,
        private commonService: CommonService,
        private router: Router,
        private route: ActivatedRoute
    ) {}
    ngOnInit(): void {
        this.initForm();
        this.examId = this.route.snapshot.paramMap.get('id');
        if (this.examId) {
            this.mode = 'update';
            this.getExamById();
        }
        this.getCourses();
    }

    getExamById() {
        this.examService.getExamById(this.examId).subscribe((response: any) => {
            if (response?.success) {
                this.loadFormWithExamData(response.exam);
            }
        });
    }

    loadFormWithExamData(exam: any) {
        this.ExamName.setValue(exam.examName);
        this.ExamDate.setValue(exam.examDate);
        this.ExamCentre.setValue(exam.examCentre);
        this.RegistrationOpenDate.setValue(exam.registrationOpenDate);
        this.RegistrationCloseDate.setValue(exam.registrationCloseDate);
        this.Year.setValue(exam.year);
        this.Semester.setValue(exam.semester);
        this.Status.setValue(exam.status);
        exam.courses.forEach((course: any) => {
            this.CourseInfo.controls.push(this.getCourseFormTemplate(course));
        });
    }

    initForm() {
        this.examForm = this.formBuilder.group({
            examName: ['', [Validators.required]],
            examFees: ['', [Validators.required]],
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

    getCourses() {
        this.loading = true;
        this.commonService.getCourses().subscribe((res: any) => {
            if (res?.success) {
                this.allCourses = res.courses;
            }
            this.loading = false;
        });
    }

    public get CourseInfo(): FormArray {
        return this.examForm.get('courses') as FormArray;
    }

    public get ExamName(): FormControl {
        return this.examForm.get('examName') as FormControl;
    }
    public get ExamFees(): FormControl {
        return this.examForm.get('examFees') as FormControl;
    }

    public get ExamDate(): FormControl {
        return this.examForm.get('examDate') as FormControl;
    }
    public get RegistrationOpenDate(): FormControl {
        return this.examForm.get('registrationOpenDate') as FormControl;
    }
    public get RegistrationCloseDate(): FormControl {
        return this.examForm.get('registrationCloseDate') as FormControl;
    }
    public get ExamCentre(): FormControl {
        return this.examForm.get('examCentre') as FormControl;
    }
    public get Semester(): FormControl {
        return this.examForm.get('semester') as FormControl;
    }
    public get Year(): FormControl {
        return this.examForm.get('year') as FormControl;
    }
    public get Status(): FormControl {
        return this.examForm.get('status') as FormControl;
    }

    optionSelected(event: MatAutocompleteSelectedEvent, idx: number) {
        const selectedCourse = event.option.value;
        const controls = this.CourseInfo?.['controls'];
        const courseObject = {
            courseCode: selectedCourse.courseCode,
            courseName: selectedCourse.courseName,
            courseCredits: selectedCourse.courseCredits,
        };
        if (this.isCourseTaken(selectedCourse.courseCode)) {
            controls[idx].reset();
            this.commonService.openSnackbar('Course already taken');
        } else {
            controls[idx].setValue(courseObject);
        }
    }

    addCourse() {
        this.CourseInfo.push(this.getCourseFormTemplate());
        this.CourseInfo.updateValueAndValidity();
    }
    getCourseFormTemplate(value?: any) {
        return this.formBuilder.group({
            courseCode: [value?.courseCode, [Validators.required]],
            courseName: [value?.courseName, [Validators.required]],
            courseCredits: [value?.courseCredits, [Validators.required]],
        });
    }

    removeCourse(idx: number) {
        const controls = this.CourseInfo?.['controls'];
        controls.splice(idx, 1);
        this.CourseInfo.updateValueAndValidity();
    }

    isCourseTaken(code: string): boolean {
        let taken = false;
        const controls = this.CourseInfo?.['controls'];
        controls.forEach((course: any) => {
            if (course?.get('courseCode').value === code) {
                taken = true;
            }
        });
        return taken;
    }
    openInputBoxForCode(idx: number) {
        const controls = this.CourseInfo?.['controls'];
        this.filteredCourses = controls[idx].get('courseCode')?.valueChanges.pipe(
            startWith(''),
            map((value: any) => (value ? this._filteredCoursesWithCode(value) : this.allCourses))
        );
    }

    openInputBoxForName(idx: number) {
        const controls = this.CourseInfo?.['controls'];
        this.filteredCourses = controls[idx].get('courseName')?.valueChanges.pipe(
            startWith(''),
            map((value: any) => (value ? this._filteredCoursesWithName(value) : this.allCourses))
        );
    }

    _filteredCoursesWithCode(value: any): any[] {
        console.log('value', typeof value);
        if (typeof value === 'object') return [];
        const filterValue = value.toLowerCase();
        return this.allCourses.filter((course: any) => course.courseCode.toLowerCase().includes(filterValue));
    }
    _filteredCoursesWithName(value: string): any[] {
        if (typeof value === 'object') return [];
        const filterValue = value.toLowerCase();
        return this.allCourses.filter((course: any) => course.courseName.toLowerCase().includes(filterValue));
    }

    getCourseIds() {
        let ids: any[] = [];
        const controls = this.CourseInfo?.['controls'];
        controls.forEach((course: any) => {
            const idx = this.allCourses.find((c) => c.courseCode === course.controls.courseCode.value);
            if (idx) ids.push(idx._id);
        });
        return ids;
    }

    back() {
        this.router.navigate(['examinations'], { relativeTo: this.route.parent });
    }

    onSubmit() {
        const ids = this.getCourseIds();
        const payload = this.examForm.value;
        delete payload.courses;
        Object.assign(payload, { courses: ids });
        payload.status = payload.status.toLowerCase();
        let response;
        if (this.mode === 'create') {
            response = this.examService.createExam(payload);
        } else {
            response = this.examService.updateExam(payload, this.examId);
        }
        response.subscribe((response: any) => {
            if (response?.success) {
                this.back();
            } else {
                this.commonService.openSnackbar('Something Went Wrong! Try Again...');
            }
        });
    }
}
