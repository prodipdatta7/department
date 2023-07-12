import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamService } from 'src/app/examination/services/exam.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    upCommingExams: any[] = [];
    notices: any[] = [];
    dataLoaded = false;
    constructor(private examService: ExamService, private router: Router) {}
    ngOnInit(): void {
        this.getExams();
    }

    getExams() {
        this.dataLoaded = false;
        this.examService.getUpcommingExaminations('upcomming').subscribe((res: any) => {
            if (res?.body?.success) {
                this.upCommingExams = res.body.examList || [];
            }
            this.dataLoaded = true;
        });
    }
    seeDetails(id: any) {
        this.router.navigate([`examination/details/${id}`]);
    }
}
