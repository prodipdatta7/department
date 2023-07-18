import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ExamService} from '../../services/exam.service';
import {MatDialog} from '@angular/material/dialog';
import {AppRegistrationConfirmModalComponent} from '../app-registration-confirm-modal/app-registration-confirm-modal.component';
import {LocalStorageService} from 'src/app/services/local-storage.service';

@Component({
    selector: 'app-exam-details',
    templateUrl: './exam-details.component.html',
    styleUrls: ['./exam-details.component.scss'],
})
export class ExamDetailsComponent implements OnInit {
    examData: any;
    dataLoaded = false;
    isAdmin = false;
    userId: string | undefined;

    constructor(
        private route: ActivatedRoute,
        private examService: ExamService,
        private router: Router,
        private dialog: MatDialog,
        private storageService: LocalStorageService
    ) {
    }

    ngOnInit(): void {
        const user = this.storageService.getLoggedInUserData();
        if (user) {
            this.userId = JSON.parse(user)?._id;
        } else {
            this.router.navigate(['login']);
        }
        const exam_id = this.route.snapshot.paramMap.get('id');
        this.isAdmin = this.route.snapshot.queryParamMap.get('user') === 'admin';
        this.examService.getExamById(exam_id).subscribe((response: any) => {
            if (response?.exam) this.examData = response?.exam;
            this.dataLoaded = true;
        });
    }

    isRegistrationOpened(startDate: Date, endDate: Date): boolean {
        if (!startDate || !endDate) return false;
        const curDate = new Date();
        return Boolean(curDate.getTime() >= new Date(startDate).getTime() && curDate.getTime() < new Date(endDate).getTime());
    }

    backToExamTab() {
        if (this.isAdmin) {
            this.router.navigate(['admin/examinations']);
        } else this.router.navigate(['examination']);
    }

    register() {
        const dialogref = this.dialog.open(AppRegistrationConfirmModalComponent);
        dialogref.afterClosed().subscribe((response: any) => {
            if (response === 'register') {
                this.router.navigate(['./registration'], {
                    relativeTo: this.route,
                    queryParams: {
                        userId: this.userId
                    },
                    queryParamsHandling: "merge"
                });
            } else if (response === 'profile') {
                this.goToProfile();
            }
        });
    }

    goToProfile() {
        this.router.navigate([`profile/${this.userId}`]);

    }
}
