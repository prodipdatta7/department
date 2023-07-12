import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    declare signupForm: FormGroup;
    DEPARTMENTS = environment.DEPARTMENTS;
    SESSIONS = environment.SESSIONS;
    CLASSES = environment.CLASSES;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private commonService: CommonService
    ) {}

    ngOnInit(): void {
        console.log(this.SESSIONS);
        this.initForm();
    }
    initForm() {
        this.signupForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            studentId: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            department: ['CSE', [Validators.required]],
            semester: ['', [Validators.required]],
            session: ['', [Validators.required]],
        });
        this.signupForm
            .get('email')
            ?.valueChanges.pipe(debounceTime(700))
            .subscribe((value: any) => {
                this.userService.getUserByEmail(value).subscribe((response: any) => {
                    if (response?.body?.data?.length > 0) {
                        this.signupForm.get('email')?.setErrors({ uniqueEmailError: true });
                    }
                    this.signupForm.updateValueAndValidity();
                });
            });
    }
    homepage() {
        this.router.navigate(['dashboard']);
    }
    register() {
        const payload = this.signupForm.value;
        this.userService.Register(payload).subscribe((response: any) => {
            if (response.success) {
                this.commonService.openSnackbar('Successfully Signed up!');
                this.router.navigate(['login']);
            } else {
                this.commonService.openSnackbar('Sign Up Failed!!!!!');
            }
        });
    }
}
