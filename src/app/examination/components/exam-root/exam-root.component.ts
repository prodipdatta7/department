import {Component, OnInit} from '@angular/core';
import {ExamService} from '../../services/exam.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-exam-root',
    templateUrl: './exam-root.component.html',
    styleUrls: ['./exam-root.component.scss'],
})
export class ExamRootComponent implements OnInit {
    upcommingExams: any[] = [];
    pastExams: any[] = [];

    constructor(private examService: ExamService, private router: Router, private route: ActivatedRoute) {}

    static isRegistrationOpened(startDate: Date, endDate: Date) {
        if (!startDate || !endDate) return false;
        const curDate = new Date();
        return new Date(curDate).getTime() >= new Date(startDate).getTime() && new Date(curDate).getTime() < new Date(endDate).getTime();
    }

    ngOnInit(): void {
        this.examService.getUpcommingExaminations().subscribe((response: any) => {
            if (response?.body?.success) {
                this.upcommingExams = response.body.examList.filter((exam: any) => exam.status === 'upcomming');
                this.pastExams = response.body.examList.filter((exam: any) => exam.status === 'past');
                this.getRegistrationStatus();
            }
        });
    }

    getRegistrationStatus() {
        for (const element of this.upcommingExams) {
            element.isRegistrationOpened = ExamRootComponent.isRegistrationOpened(element.registrationOpenDate, element.registrationCloseDate);
            console.log(element.isRegistrationOpened)
        }
    }
    seeDetails(exam: any) {
        console.log(exam);
        this.router.navigate([`./details/${exam._id}`], { relativeTo: this.route.parent });
    }
}
