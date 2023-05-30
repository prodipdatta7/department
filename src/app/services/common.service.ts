import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CommonService {
    checkUserLoginStatus: BehaviorSubject<Boolean | null> = new BehaviorSubject<Boolean | null>(null);
    userLoggedout: BehaviorSubject<Boolean | null> = new BehaviorSubject<Boolean | null>(null);
    constructor() {}
}
