import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmailValidator } from 'src/app/auth/email.validator';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    declare signupForm: FormGroup;
    constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private snackBar: MatSnackBar) {}

    ngOnInit(): void {
        this.initForm();
    }
    initForm() {
        this.signupForm = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
            lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
            email: ['', [Validators.required, Validators.email, EmailValidator(this.userService)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            city: ['', [Validators.required]],
            zip: ['', [Validators.required]],
            apartment: [''],
            street: [''],
            division: ['', [Validators.required]],
            country: ['', [Validators.required]],
        });
    }
    homepage() {
        this.router.navigate(['dashboard']);
    }
    register() {
        const payload = {
            firstName: this.signupForm.get('firstName')?.value,
            lastName: this.signupForm.get('lastName')?.value,
            email: this.signupForm.get('email')?.value,
            password: this.signupForm.get('password')?.value,
            city: this.signupForm.get('city')?.value,
            zip: this.signupForm.get('zip')?.value,
            apartment: this.signupForm.get('apartment')?.value,
            street: this.signupForm.get('street')?.value,
            division: this.signupForm.get('division')?.value,
            country: this.signupForm.get('country')?.value,
        };
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
