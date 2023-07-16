import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { AdminRootComponent } from './components/admin-root/admin-root.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailsComponent } from './components/course-details-&-edit/course-details.component';
import { ExamComponent } from './components/exam/exam.component';
import { CreateExamComponent } from './components/create-exam/create-exam.component';

const routes: Routes = [
    {
        path: '',
        component: AdminRootComponent,
        children: [
            {
                path: 'users',
                component: UsersComponent,
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'users',
            },
            {
                path: 'courses',
                component: CoursesComponent,
            },
            {
                path: 'courses/:id',
                component: CourseDetailsComponent,
            },
            {
                path: 'examinations',
                component: ExamComponent,
            },
            {
                path: 'create-exam',
                component: CreateExamComponent,
            },
            {
                path: 'examination/update/:id',
                component: CreateExamComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
