import { Component } from '@angular/core';
import {ExamService} from "../../services/exam.service";
import {UserService} from "../../../services/user.service";
import {forkJoin} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonService} from "../../../services/common.service";
import {LocalStorageService} from "../../../services/local-storage.service";
import {loadStripe} from "@stripe/stripe-js";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-exam-payments',
  templateUrl: './exam-payments.component.html',
  styleUrls: ['./exam-payments.component.scss']
})
export class ExamPaymentsComponent {
    exam: any ;
    user: any;
    dataLoaded = false ;
    constructor(
        private examService: ExamService,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        private commonService: CommonService,
        private storageService: LocalStorageService,
        private http: HttpClient
    ){}

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
                    this.user = data?.[0]?.data;
                    this.exam = data?.[1]?.exam;
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
    register(): void {
        this.http.post('http://localhost:3000/checkout', {
            name: this.user._id,
            email: this.user.email,
            id: this.user._id,
            examId: this.exam._id,
            fees: (this.exam.examFees || 3000) * 100
        }).subscribe(async (res: any) => {
            let stripe = await loadStripe('pk_test_51NVWxISFC5KjlFjgnvr1Y8jUa9xCdOELeRUKvZCaWeYrgIt5d4FKyeroAUfNTkxe9X6Nl7b39qKxNoHOqLOM0W4V00y8rHnS1Y');
            stripe?.redirectToCheckout({
                sessionId: res.id
            })
        })
    }
}
