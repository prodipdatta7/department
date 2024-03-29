import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
import {filter, Subscription} from 'rxjs';
import {CommonService} from './services/common.service';
import {NavigationEnd, Router} from '@angular/router';

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
    navigations = CommonService.navigations;
    activeTab = 'home';

    constructor(private userService: UserService, private commonService: CommonService, private router: Router) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                if (event.url) {
                    const paths = event.url.split('/');
                    if (paths.length >= 2) {
                        this.activeTab = paths[1];
                    }
                }
            }
        })
    }
    ngOnInit(): void {
        if (this.userService.isStillAuthentic()) {
            const data = this.userService.getUserData() || {};
            this.isAuthenticated = true;
            const id = data._id;
            this.userService.getUserById(id).subscribe((res: any) => {
                if (res?.data) {
                    this.profileData = res.data;
                }
            });
        } else {
            this.router.navigateByUrl('login').then();
        }
        this.subscriptions.push(
            this.commonService.checkUserLoginStatus.pipe(filter((t) => t !== null)).subscribe((flag) => {
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
        this.router.navigate(['login']);
    }
    settings() {
        this.router.navigate([`profile/${this.profileData._id}/update`]);
    }
    visitProfile() {
        this.router.navigate([`profile/${this.profileData._id}`]);
    }
}
