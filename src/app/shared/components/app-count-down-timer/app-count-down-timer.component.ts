import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-count-down-timer',
    templateUrl: './app-count-down-timer.component.html',
    styleUrls: ['./app-count-down-timer.component.scss'],
})
export class AppCountDownTimerComponent implements OnInit {
    @Input('closeDate') closeDate!: Date;

    remainingDays: number = 0;
    remainingHours: number = 0;
    remainingMinutes: number = 0;
    remainingSeconds: number = 0;
    milliSecondsInASecond = 1000;
    hoursInADay = 24;
    minutesInAnHour = 60;
    SecondsInAMinute = 60;

    ngOnInit(): void {
        console.log(this.closeDate);
        setInterval(() => {
            this.updateTime();
        }, 1000);
    }

    updateTime() {
        const currentTime = new Date().getTime();
        const endTime = new Date(this.closeDate).getTime();
        const timeDifference = endTime - currentTime;
        this.remainingSeconds = Math.floor((timeDifference / this.milliSecondsInASecond) % this.SecondsInAMinute);
        this.remainingMinutes = Math.floor(
            (timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour)) % this.SecondsInAMinute
        );
        this.remainingMinutes = Math.floor(
            (timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute)) % this.hoursInADay
        );
        this.remainingDays = Math.floor(
            timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay)
        );
    }
}
