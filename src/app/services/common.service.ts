import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CommonService {
    checkUserLoginStatus: BehaviorSubject<Boolean | null> = new BehaviorSubject<Boolean | null>(null);
    userLoggedout: BehaviorSubject<Boolean | null> = new BehaviorSubject<Boolean | null>(null);
    constructor(private snackBar: MatSnackBar) {}

    openSnackbar(message?: any, actions = 'Ok') {
        this.snackBar.open(message, actions, {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
        });
    }
}
