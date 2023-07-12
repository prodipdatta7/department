import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CommonService {
    checkUserLoginStatus: BehaviorSubject<Boolean | null> = new BehaviorSubject<Boolean | null>(null);
    userLoggedout: BehaviorSubject<Boolean | null> = new BehaviorSubject<Boolean | null>(null);
    supportedImageType = ['image/jpeg', 'image/jpg', 'image/png'];
    courseApi = 'http://localhost:3000/courses';
    public static navigations = [
        {
            title: 'Home',
            url: 'home',
            isActive: true,
        },
        {
            title: 'Exams',
            url: 'examination',
            isActive: false,
        },
        {
            title: 'Profile',
            url: 'profile',
            isActive: false,
        },
        {
            title: 'Contact-Us',
            url: 'contact-us',
            isActive: false,
        },
    ];
    constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

    openSnackbar(message?: any, actions = 'Ok') {
        this.snackBar.open(message, actions, {
            duration: 10000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
        });
    }

    checkImageValidation(file: any): boolean {
        const isExist = this.supportedImageType.includes(file.type);
        if (!isExist) {
            this.openSnackbar('File type not supported. Supported types are: jpeg, jpg, png');
        }
        return isExist;
    }

    getCourses(payload?: any): Observable<any> {
        return this.http.get<any>(`${this.courseApi}/getCourses`);
    }
}
