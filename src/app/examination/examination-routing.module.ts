import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamRootComponent } from './components/exam-root/exam-root.component';
import { ExamDetailsComponent } from './components/exam-details/exam-details.component';
import { ExamRegistrationComponent } from './components/exam-registration/exam-registration.component';
import { ExamPaymentsComponent } from './components/exam-payments/exam-payments.component';
import {ExamRegistrationSuccessComponent} from "./components/exam-registration-success/exam-registration-success.component";

const routes: Routes = [
    {
        path: '',
        component: ExamRootComponent,
    },
    {
        path: 'details/:id',
        component: ExamDetailsComponent,
    },
    {
        path: 'details/:id/registration',
        component: ExamRegistrationComponent,
    },
    {
        path: 'details/:id/payments',
        component: ExamPaymentsComponent,
    },
    {
        path: 'details/:id/registration/successful',
        component: ExamRegistrationSuccessComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ExaminationRoutingModule {}
