import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Subscription, filter } from 'rxjs';
import { CommonService } from './services/common.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'department';
    isAuthenticated = false;
    profileData: any;
    subscriptions: Subscription[] = [];
    constructor(private userService: UserService, private commonService: CommonService) {}
    ngOnInit(): void {
        if (this.userService.isStillAuthentic()) {
            this.profileData = this.userService.getUserData() || {};
            this.isAuthenticated = true;
        }
        this.subscriptions.push(
            this.commonService.checkUserLoginStatus.pipe(filter((t) => t !== null)).subscribe((flag) => {
                debugger;
                if (flag) {
                    this.profileData = this.userService.getUserData() || {};
                    this.isAuthenticated = true;
                }
            }),
            this.commonService.userLoggedout.pipe(filter((t) => t !== null)).subscribe((flag) => {
                if (flag) {
                    this.isAuthenticated = false;
                    this.profileData = {};
                }
            })
        );
    }
    ngOnDestroy(): void {
        for (const element of this.subscriptions) {
            element.unsubscribe();
        }
    }
    logout() {
        this.userService.Logout();
    }
}
