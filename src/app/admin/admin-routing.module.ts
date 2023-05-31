import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { AdminRootComponent } from './components/admin-root/admin-root.component';

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
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
