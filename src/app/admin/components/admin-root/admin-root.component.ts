import {Component} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
    selector: 'app-admin-root',
    templateUrl: './admin-root.component.html',
    styleUrls: ['./admin-root.component.scss'],
})
export class AdminRootComponent {
    activeTab = 'users';

    constructor(private route: ActivatedRoute, private router: Router) {
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (event?.url) {
                    const paths = event.url.split('/');
                    if (paths.length >= 3) {
                        this.activeTab = paths[2];
                    }
                }
            }
        });
    }
}
