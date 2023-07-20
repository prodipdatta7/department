import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExaminationRoutingModule } from './examination-routing.module';
import { ExamRootComponent } from './components/exam-root/exam-root.component';
import { ExamDetailsComponent } from './components/exam-details/exam-details.component';
import { ExamRegistrationComponent } from './components/exam-registration/exam-registration.component';
import { ExamPaymentsComponent } from './components/exam-payments/exam-payments.component';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { SharedModule } from '../shared/shared.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AppRegistrationConfirmModalComponent } from './components/app-registration-confirm-modal/app-registration-confirm-modal.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { ExamRegistrationSuccessComponent } from './components/exam-registration-success/exam-registration-success.component';
import { ExamPaymentFailedComponent } from './components/exam-payment-failed/exam-payment-failed.component';

@NgModule({
    declarations: [
        ExamRootComponent,
        ExamDetailsComponent,
        ExamRegistrationComponent,
        ExamPaymentsComponent,
        AppRegistrationConfirmModalComponent,
        ExamRegistrationSuccessComponent,
        ExamPaymentFailedComponent,
    ],
    imports: [
        CommonModule,
        ExaminationRoutingModule,
        FlexModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatDividerModule,
        SharedModule,
        MatProgressBarModule,
        MatTooltipModule,
        MatProgressSpinnerModule
    ],
    entryComponents: [AppRegistrationConfirmModalComponent],
})
export class ExaminationModule {}
