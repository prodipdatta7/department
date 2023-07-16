import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-admin-root',
    templateUrl: './admin-root.component.html',
    styleUrls: ['./admin-root.component.scss'],
})
export class AdminRootComponent {
    constructor(private route: ActivatedRoute) {}
}
