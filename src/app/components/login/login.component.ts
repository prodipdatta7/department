import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    declare loginForm: FormGroup;
    hide = false;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private commonService: CommonService,
        private localStorage: LocalStorageService
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
    }
    login() {
        const payload = {
            email: this.loginForm.get('email')?.value,
            password: this.loginForm.get('password')?.value,
        };
        this.userService.Login(payload).subscribe((response) => {
            if (response?.success) {
                const token = response.token;
                this.localStorage.setToken(token);
                this.localStorage.setLoggedInUserData(response.data);
                this.commonService.checkUserLoginStatus.next(true);
                this.router.navigate([`profile/${response.data._id}`]);
            }
        });
    }
    homePage() {
        this.router.navigate(['dashboard']);
    }
}
