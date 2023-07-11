import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { ImageViewerComponent } from 'src/app/shared/components/image-viewer/image-viewer.component';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
    form!: FormGroup;
    studentForm!: FormGroup;
    academicForm!: FormGroup;
    courseForm!: FormGroup;
    admitCardForm!: FormGroup;
    imagePreview!: string | ArrayBuffer | null;
    userProfileData: any;
    academics: any[] = [];
    courses: any[] = [];
    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private commonService: CommonService,
        private userService: UserService,
        private router: Router,
        private dialog: MatDialog
    ) {}
    ngOnInit(): void {
        if (!this.userService.isStillAuthentic()) this.router.navigateByUrl('login').then();
        const id = this.route.snapshot.paramMap.get('id');
        this.userService.getUserById(id).subscribe((res) => {
            if (res?.data) {
                this.userProfileData = res.data;
                this.imagePreview = res.data?.imagePath;
                this.academics = res.data.academicInfo;
                this.courses = res.data.courses;
            }
        });
        this.initForm();
    }
    zoom() {
        const data = {
            imgSrc: this.imagePreview,
        };
        this.dialog.open(ImageViewerComponent, {
            autoFocus: false,
            data: data,
        });
    }
    initForm() {
        this.form = this.fb.group({
            image: ['', [Validators.required]],
        });
        this.studentForm = this.fb.group({
            NameEN: ['', [Validators.required]],
            NameBE: ['', [Validators.required]],
            FatherNameEN: ['', [Validators.required]],
            FatherNameBE: ['', [Validators.required]],
            MotherNameEN: ['', [Validators.required]],
            MotherNameBE: ['', [Validators.required]],
            Guardian: ['', [Validators.required]],
            PresentAddress: ['', [Validators.required]],
            Phone: ['', [Validators.required]],
            PermanentAddress: this.fb.group({
                Village: ['', [Validators.required]],
                Post: ['', [Validators.required]],
                SubDistrict: ['', [Validators.required]],
                District: ['', [Validators.required]],
            }),
            Nationality: ['Bangladeshi', [Validators.required]],
            Religion: ['', [Validators.required]],
            Race: [''],
            BirthDate: ['', [Validators.required]],
        });
        this.academicForm = this.fb.group({
            ExamInfo: this.fb.array([
                this.fb.group({
                    ExamName: ['', Validators.required],
                    PassingYear: ['', Validators.required],
                    Institute: ['', Validators.required],
                    BoardOrUniversity: ['', Validators.required],
                    ExamRoll: ['', Validators.required],
                    DivisionOrGPA: ['', Validators.required],
                }),
            ]),
        });
        this.courseForm = this.fb.group({
            Courses: this.fb.array([
                this.fb.group({
                    CourseNo: ['', [Validators.required]],
                    CourseTitle: ['', [Validators.required]],
                    CourseCredit: ['', [Validators.required]],
                }),
            ]),
        });
    }
    onImagePicked(event: Event) {
        const file: any = (event.target as HTMLInputElement).files?.[0];
        if (!this.commonService.checkImageValidation(file)) return;
        this.form.patchValue({ image: file });
        this.form.get('image')?.updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
        this.saveImage(file);
    }
    saveImage(file: File) {
        // const payload = this.form.get('image')?.value;
        this.userService.updateUser(file, this.userProfileData._id).subscribe((res: any) => {
            console.log(res);
        });
    }
    editProfile() {
        this.router.navigate([`profile/${this.userProfileData._id}/update`]);
    }
    ngOnDestroy(): void {}
}
