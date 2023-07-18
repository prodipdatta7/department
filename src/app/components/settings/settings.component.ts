import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, count, debounceTime, filter, forkJoin, map, startWith, take } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { ImageViewerComponent } from 'src/app/shared/components/image-viewer/image-viewer.component';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
    profileData: any;
    basicInfo!: FormGroup;
    academicInfo!: FormGroup;
    courseInfo!: FormGroup;
    loading = true;
    newImageFile: File | undefined;
    imagePreview: any;
    allCourses: any[] = [];
    filteredCourses!: Observable<any[]> | undefined;
    updating = false;
    CLASSES = environment.CLASSES;
    isAdmin = false ;
    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private router: Router,
        private fb: FormBuilder,
        private dialog: MatDialog,
        private commonService: CommonService,
        private location: Location
    ) {}
    ngOnInit(): void {
        this.loading = true;
        const id = this.route.snapshot?.params['id'];
        this.isAdmin = this.route.snapshot.queryParamMap.get('user') === 'admin' ;
        this.getCourses();
        this.userService.getUserById(id).subscribe((res: any) => {
            if (res?.data) {
                this.profileData = res.data;
                this.imagePreview = this.profileData?.imagePath;
            }
            this.loading = false;
            this.initForm();
        });
    }

    getCourses() {
        this.commonService.getCourses().subscribe((res: any) => {
            if (res?.success) {
                this.allCourses = res.courses;
            }
        });
    }
    getAcademicFormTemplate(value?: any) {
        return this.fb.group({
            examName: [value?.examName, [Validators.required]],
            passingYear: [value?.passingYear, [Validators.required]],
            institute: [value?.institute, [Validators.required]],
            board: [value?.board, [Validators.required]],
            examRoll: [value?.examRoll, [Validators.required]],
            GPA: [value?.GPA, [Validators.required]],
        });
    }
    getCourseFormTemplate(value?: any) {
        return this.fb.group({
            courseCode: [value?.courseCode, [Validators.required]],
            courseName: [value?.courseName, [Validators.required]],
            courseCredits: [value?.courseCredits, [Validators.required]],
        });
    }

    initForm() {
        this.basicInfo = this.fb.group({
            Name: [this.profileData?.name, [Validators.required]],
            FatherName: [this.profileData?.fatherName, [Validators.required]],
            MotherName: [this.profileData?.motherName, [Validators.required]],
            GuardianName: [this.profileData?.guardianName, [Validators.required]],
            PresentAddress: [this.profileData?.address, [Validators.required]],
            Phone: [this.profileData?.phone, [Validators.required]],
            Village: [this.profileData?.village, [Validators.required]],
            PostOffice: [this.profileData?.postOffice, [Validators.required]],
            SubDistrict: [this.profileData?.subDistrict, [Validators.required]],
            District: [this.profileData?.district, [Validators.required]],
            Nationality: [this.profileData?.nationality, [Validators.required]],
            Religion: [this.profileData?.religion, [Validators.required]],
            BirthDate: [new Date(this.profileData?.birthDate), [Validators.required]],
            hallName: [this.profileData?.hallName, [Validators.required]],
            semester: [this.profileData?.semester, [Validators.required]],
        });
        console.log(this.profileData?.birthDate);
        this.academicInfo = this.fb.group({
            infos: this.fb.array([]),
        });
        this.courseInfo = this.fb.group({
            infos: this.fb.array([]),
        });
        if (this.profileData?.academicInfo?.length) {
            for (const element of this.profileData.academicInfo) {
                this.AcademicInfo.push(this.getAcademicFormTemplate(element));
            }
        } else {
            this.AcademicInfo.push(this.getAcademicFormTemplate());
        }
        if (this.profileData?.courses?.length) {
            for (const element of this.profileData.courses) {
                this.CourseInfo.push(this.getCourseFormTemplate(element));
            }
        }
    }

    addAnotherRow() {
        this.AcademicInfo.push(this.getAcademicFormTemplate());
        this.AcademicInfo.updateValueAndValidity();
    }
    removeRow(idx: number) {
        const controls = this.AcademicInfo?.['controls'];
        controls.splice(idx, 1);
        this.AcademicInfo.updateValueAndValidity();
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

    removeCourse(idx: number) {
        const controls = this.CourseInfo?.['controls'];
        controls.splice(idx, 1);
        this.CourseInfo.updateValueAndValidity();
    }

    get Name(): FormControl {
        return this.basicInfo.get('Name') as FormControl;
    }
    get FatherName(): FormControl {
        return this.basicInfo.get('FatherName') as FormControl;
    }
    get MotherName(): FormControl {
        return this.basicInfo.get('MotherName') as FormControl;
    }
    get GuardianName(): FormControl {
        return this.basicInfo.get('GuardianName') as FormControl;
    }
    get PresentAddress(): FormControl {
        return this.basicInfo.get('PresentAddress') as FormControl;
    }
    get Phone(): FormControl {
        return this.basicInfo.get('Phone') as FormControl;
    }
    get Village(): FormControl {
        return this.basicInfo.get('Village') as FormControl;
    }
    get PostOffice(): FormControl {
        return this.basicInfo.get('PostOffice') as FormControl;
    }
    get SubDistrict(): FormControl {
        return this.basicInfo.get('SubDistrict') as FormControl;
    }
    get District(): FormControl {
        return this.basicInfo.get('District') as FormControl;
    }
    get Nationality(): FormControl {
        return this.basicInfo.get('Nationality') as FormControl;
    }
    get Religion(): FormControl {
        return this.basicInfo.get('Religion') as FormControl;
    }
    get BirthDate(): FormControl {
        return this.basicInfo.get('BirthDate') as FormControl;
    }
    get HallName(): FormControl {
        return this.basicInfo.get('hallName') as FormControl;
    }
    get Semester(): FormControl {
        return this.basicInfo.get('semester') as FormControl;
    }
    get AcademicInfo(): FormArray {
        return this.academicInfo.get('infos') as FormArray;
    }
    get CourseInfo(): FormArray {
        return this.courseInfo.get('infos') as FormArray;
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
        return this.allCourses.filter((course) => course.courseCode.toLowerCase().includes(filterValue));
    }
    _filteredCoursesWithName(value: string): any[] {
        if (typeof value === 'object') return [];
        const filterValue = value.toLowerCase();
        return this.allCourses.filter((course) => course.courseName.toLowerCase().includes(filterValue));
    }

    changeImage(event: Event) {
        const file: any = (event.target as HTMLInputElement).files?.[0];
        if (!this.commonService.checkImageValidation(file)) return;
        this.newImageFile = file;
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
    }

    viewImage(event: Event) {
        const data = {
            imgSrc: this.imagePreview,
        };
        this.dialog.open(ImageViewerComponent, {
            autoFocus: false,
            data: data,
        });
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

    preparePayload() {
        let payload: any = {
            name: this.Name.value,
            fatherName: this.FatherName.value,
            motherName: this.MotherName.value,
            guardianName: this.GuardianName.value,
            address: this.PresentAddress.value,
            phone: this.Phone.value,
            village: this.Village.value,
            postOffice: this.PostOffice.value,
            subDistrict: this.SubDistrict.value,
            district: this.District.value,
            nationality: this.Nationality.value,
            religion: this.Religion.value,
            birthDate: this.BirthDate.value,
            hallName: this.HallName.value,
            semester: this.Semester.value,
            academicInfo: this.AcademicInfo.value,
            courses: this.getCourseIds(),
        };
        return payload;
    }

    onSave() {
        this.updating = true;
        let payload = this.preparePayload();
        const subscriptions: any[] = [];
        if (this.newImageFile) {
            subscriptions.push(this.userService.updateUser({}, this.profileData._id, this.newImageFile));
        }
        subscriptions.push(this.userService.updateUser(payload, this.profileData._id));
        forkJoin(subscriptions).subscribe((res) => {
            this.updating = true;
            if (res.every((element) => element.success === true)) {
                this.backToProfile();
            } else {
                this.commonService.openSnackbar('update error!');
            }
        });
    }
    backToProfile() {
        // const id = this.route.snapshot.paramMap.get('id');
        // this.router.navigate([`profile/${id}`]);
        this.location.back();
    }
}
