import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {UsersComponent} from './components/users/users.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FlexModule} from '@angular/flex-layout';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {AdminRootComponent} from './components/admin-root/admin-root.component';
import {CoursesComponent} from './components/courses/courses.component';
import {CourseDetailsComponent} from './components/course-details-&-edit/course-details.component';
import {ExamComponent} from './components/exam/exam.component';
import {HttpClientModule} from '@angular/common/http';
import {CourseAddModalComponent} from './modals/course-add-modal/course-add-modal.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {CreateExamComponent} from './components/create-exam/create-exam.component';
import {ConfirmationModalComponent} from './modals/exam-delete-confirmation-modal/confirmation-modal.component';
import {ConfirmationModalCourseComponent} from './modals/course-delete-confirmation-modal/confirmation-modal.component';
import {UserDeleteConfirmationModalComponent} from './modals/user-delete-confirmation-modal/user-delete-confirmation-modal.component';
import {CreateUserModalComponent} from './modals/create-user-modal/create-user-modal.component';

const materials = [
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSortModule,
    MatPaginatorModule,
    MatDividerModule,
    MatGridListModule,
    MatDatepickerModule,
];

@NgModule({
    declarations: [
        UsersComponent,
        AdminRootComponent,
        CoursesComponent,
        CourseDetailsComponent,
        ExamComponent,
        CourseAddModalComponent,
        ConfirmationModalComponent,
        CreateExamComponent,
        ConfirmationModalCourseComponent,
        UserDeleteConfirmationModalComponent,
        CreateUserModalComponent,
    ],
    imports: [CommonModule, AdminRoutingModule, FlexModule, ...materials, HttpClientModule],
    entryComponents: [CourseAddModalComponent],
})
export class AdminModule {}
