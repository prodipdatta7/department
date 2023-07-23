import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ExamService} from "../../services/exam.service";
import {LocalStorageService} from "../../../services/local-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {forkJoin} from "rxjs";
import {CommonService} from "../../../services/common.service";

@Component({
    selector: 'app-exam-registration-success',
    templateUrl: './exam-registration-success.component.html',
    styleUrls: ['./exam-registration-success.component.scss']
})
export class ExamRegistrationSuccessComponent implements OnInit {
    dataLoaded = false;
    filePath: any;
    submitted = false;
    userData: any;
    examData: any;

    constructor(
        private userService: UserService,
        private examService: ExamService,
        private storageService: LocalStorageService,
        private route: ActivatedRoute,
        private commonService: CommonService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.dataLoaded = false;
        const examId = this.route.snapshot.paramMap.get('id');
        const userId = this.route.snapshot.queryParamMap.get('userId');
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
            this.prepareDataForPdf(examId, id);
        } else {
            this.commonService.openSnackbar('Authentication failed! Login please.');
            this.router.navigate(['login']);
        }

    }

    openPdf() {
        const paths = this.filePath.split('\\');
        const fileName = paths[paths?.length - 1];
        const url = `assets/pdf/${fileName}`;
        window.open(url, '_blank');
    }

    homePage() {
        this.router.navigate(['home']);
    }

    prepareDataForPdf(examId: string | null, userId: string | null) {
        const subscriptions = [this.examService.getExamById(examId), this.userService.getUserById(userId)];
        forkJoin(subscriptions).pipe(
            map(([exam, user]) => {
                const response = {
                    success: exam?.success && user?.success,
                    data: {}
                };
                let data = {};
                if (exam?.success && user?.success) {
                    const examId = exam.exam._id;
                    const userId = user.data._id;
                    Object.assign(data, {examId: examId});
                    Object.assign(data, {userId: userId});
                    delete exam.exam._id;
                    delete user.data._id;
                    delete user.data.createdAt;
                    delete user.data.updatedAt;
                    delete user.data._v;
                    Object.assign(data, user.data);
                    Object.assign(data, exam.exam);
                }
                Object.assign(response.data, data);
                return response;
            })).subscribe((response: any) => {
            if (response?.success) {
                this.examService.getDocuments(response.data).subscribe((fileResponse: any) => {
                    this.dataLoaded = true;
                    if (fileResponse?.success) {
                        this.filePath = fileResponse.file;
                    } else {
                        this.commonService.openSnackbar('Something Went wrong! PDF generator is not working. Try again later...');
                    }
                })
            } else {
                this.dataLoaded = true;
                this.commonService.openSnackbar('Something Went wrong! User of exam data not loaded. Try again later...');
            }
        })
    }

    register() {
        this.submitted = true;
        const examPayload = {
            registeredStudents: [...this.examData.registeredStudents, this.userData._id]
        };
        const userPayload = {
            participatedExams: [...this.userData.participatedExams, this.examData._id]
        };
        const subscriptions = [this.examService.registerUser(examPayload, this.examData._id), this.userService.registerInExam(userPayload, this.userData._id)];
        forkJoin(subscriptions).pipe(map(([exam, user]) => {
            const response = {
                success: exam.success && user.success
            };
            Object.assign(response, {examData: exam.exam});
            Object.assign(response, {userData: user.data});
            return response;
        })).subscribe((response: any) => {
            if (response?.success) {
                this.router.navigate(['./successful'], {
                    relativeTo: this.route,
                    queryParams: {
                        userId: this.userData._id
                    },
                    queryParamsHandling: 'merge'
                }).then();
            } else {
                this.commonService.openSnackbar('Something went wrong! Try again after some time...');
            }
            this.submitted = false;
        })
    }
}
