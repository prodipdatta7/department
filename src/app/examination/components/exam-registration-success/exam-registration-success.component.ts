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
        this.prepareDataForPdf(examId, userId);
    }

    openPdf() {
        const paths = this.filePath.split('\\');
        const fileName = paths[paths?.length - 1];
        debugger
        const url = `assets/pdf/${fileName}`;
        window.open(url, '_blank');
    }

    homePage() {
        this.router.navigate(['home']);
    }

    private prepareDataForPdf(examId: string | null, userId: string | null) {
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
}
