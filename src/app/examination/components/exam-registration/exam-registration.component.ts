import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from 'src/app/services/common.service';
import {LocalStorageService} from 'src/app/services/local-storage.service';
import {UserService} from 'src/app/services/user.service';
import {ExamService} from '../../services/exam.service';
import {forkJoin} from 'rxjs';
import {Location} from '@angular/common';
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {loadStripe} from "@stripe/stripe-js";

@Component({
    selector: 'app-exam-registration',
    templateUrl: './exam-registration.component.html',
    styleUrls: ['./exam-registration.component.scss'],
})
export class ExamRegistrationComponent implements OnInit {
    userData: any;
    examData: any;
    dataLoaded = false;
    submitted = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        private commonService: CommonService,
        private storageService: LocalStorageService,
        private examService: ExamService,
        private location: Location,
        private http: HttpClient
    ) {
    }

    ngOnInit(): void {
        this.dataLoaded = false;
        const exam_id = this.route.snapshot.paramMap.get('id');
        if (!this.userService.isStillAuthentic()) {
            this.commonService.openSnackbar('Authentication failed! Login please.');
            this.router.navigate(['login']);
        }
        const user = this.storageService.getLoggedInUserData();
        if (user) {
            const id = JSON.parse(user)?._id;
            let subscriptions = [this.userService.getUserById(id), this.examService.getExamById(exam_id)];
            forkJoin(subscriptions).subscribe((data: any[]) => {
                if (data.every((f) => f.success === true)) {
                    this.userData = data?.[0]?.data;
                    this.examData = data?.[1]?.exam;
                } else {
                    this.commonService.openSnackbar('Something went wrong! Please try again.');
                }
                this.dataLoaded = true;
            });
        } else {
            this.commonService.openSnackbar('Authentication failed! Login please.');
            this.router.navigate(['login']);
        }
    }

    isValidUserInformation(): boolean {
        return this.userService.checkIfAllRequiredFieldExist(this.userData);
    }

    isUserAllowedToRegister(): boolean {
        let validity = true;
        const userClass: string = this.userData.semester;
        const _class: any = this.examService.ExamNameMapping[userClass];
        if (_class.year !== this.examData.year || _class.semester !== this.examData.semester) return false;
        this.examData.courses.forEach((course: any) => {
            const found = this.userData.courses.find((userCourse: any) => userCourse.courseCode === course.courseCode);
            if (!found) validity = false;
        });
        return validity;
    }

    back() {
        this.location.back();
    }

    onSubmit(): void {
        this.submitted = true ;
        if(this.isValidUserInformation() && this.isUserAllowedToRegister()) {

        }
        this.router.navigate(['./payment'], {relativeTo: this.route});
    }

    // register() {
    //     this.submitted = true ;
    //     if(this.isValidUserInformation() && this.isUserAllowedToRegister()) {
    //         const examPayload = {
    //             registeredStudents: [...this.examData.registeredStudents, this.userData._id]
    //         };
    //         const userPayload = {
    //             participatedExams: [...this.userData.participatedExams, this.examData._id]
    //         };
    //         const subscriptions = [this.examService.registerUser(examPayload,this.examData._id), this.userService.registerInExam(userPayload, this.userData._id)];
    //         forkJoin(subscriptions).pipe(map(([exam, user]) => {
    //             const response = {
    //                 success : exam.success && user.success
    //             };
    //             Object.assign(response, {examData: exam.exam});
    //             Object.assign(response, {userData: user.data});
    //             return response;
    //         })).subscribe((response : any) => {
    //             if(response?.success) {
    //                 this.router.navigate(['./successful'], {
    //                     relativeTo: this.route,
    //                     queryParams: {
    //                         userId: this.userData._id
    //                     },
    //                     queryParamsHandling: 'merge'
    //                 }).then();
    //             } else {
    //                 this.commonService.openSnackbar('Something went wrong! Try again after some time...');
    //             }
    //             this.submitted = false;
    //         })
    //     }
    // }
}
