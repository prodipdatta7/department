import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { AdminRootComponent } from './components/admin-root/admin-root.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { CoursesComponent } from './components/courses/courses.component';

const routes: Routes = [
    {
        path: '',
        component: AdminRootComponent,
        children: [
            {
                path: 'user',
                component: UsersComponent,
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'user',
            },
            {
                path: 'courses',
                component: CoursesComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
