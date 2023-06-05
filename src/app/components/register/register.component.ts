import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmailValidator } from 'src/app/auth/email.validator';
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
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        console.log(this.SESSIONS);
        this.initForm();
    }
    initForm() {
        this.signupForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
            email: ['', [Validators.required, Validators.email, EmailValidator(this.userService)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            studentId: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            department: ['CSE', [Validators.required]],
            address: [''],
            session: ['', [Validators.required]],
        });
    }
    homepage() {
        this.router.navigate(['dashboard']);
    }
    register() {
        const payload = this.signupForm.value;
        this.userService.Register(payload).subscribe((response: any) => {
            if (response.success) {
                this.snackBar.open('Successfully Signed up!');
                this.router.navigate(['login']);
            } else {
                this.snackBar.open('Sign Up Failed!!!!!');
            }
        });
    }
}
