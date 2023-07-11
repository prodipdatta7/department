import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../../services/exam.service';
import { MatDialog } from '@angular/material/dialog';
import { AppRegistrationConfirmModalComponent } from '../app-registration-confirm-modal/app-registration-confirm-modal.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
    selector: 'app-exam-details',
    templateUrl: './exam-details.component.html',
    styleUrls: ['./exam-details.component.scss'],
})
export class ExamDetailsComponent implements OnInit {
    examData: any;
    dataLoaded = false;
    constructor(
        private route: ActivatedRoute,
        private examService: ExamService,
        private router: Router,
        private dialog: MatDialog,
        private storageService: LocalStorageService
    ) {}

    ngOnInit(): void {
        const exam_id = this.route.snapshot.paramMap.get('id');
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
        this.router.navigate(['examination']);
    }
    register() {
        const dialogref = this.dialog.open(AppRegistrationConfirmModalComponent);
        dialogref.afterClosed().subscribe((response: any) => {
            if (response === 'register') {
                this.router.navigate(['./registration'], { relativeTo: this.route });
            } else if (response === 'profile') {
                this.goToProfile();
            }
        });
    }
    goToProfile() {
        const user = this.storageService.getLoggedInUserData();
        if (user) {
            const id = JSON.parse(user)?._id;
            this.router.navigate([`profile/${id}`]);
        }
    }
}
