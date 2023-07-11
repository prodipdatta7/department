import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
    selector: 'app-app-registration-confirm-modal',
    templateUrl: './app-registration-confirm-modal.component.html',
    styleUrls: ['./app-registration-confirm-modal.component.scss'],
})
export class AppRegistrationConfirmModalComponent {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private storageService: LocalStorageService,
        private dialogRef: MatDialogRef<AppRegistrationConfirmModalComponent>
    ) {}

    colse(response: string) {
        this.dialogRef.close(response);
    }

    goToProfile() {
        this.colse('profile');
    }
    register() {
        this.colse('register');
    }
}
