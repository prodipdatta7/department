import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, Subscription} from 'rxjs';
import {UserService} from 'src/app/services/user.service';
import {UserDeleteConfirmationModalComponent} from '../../modals/user-delete-confirmation-modal/user-delete-confirmation-modal.component';
import {CreateUserModalComponent} from "../../modals/create-user-modal/create-user-modal.component";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
    subscriptions: Subscription[] = [];
    userList: any = [];
    dataSource!: MatTableDataSource<any>;
    dataLoaded = false;
    searchedData: any;
    orderByData: any;
    search!: FormGroup;
    constructor(
        private userService: UserService,
        private router: Router,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private dialog: MatDialog
    ) {}
    @ViewChild('paginator') paginator!: MatPaginator;
    ngOnInit(): void {
        this.initSearchForm();
        this.getUserList();
    }

    initSearchForm() {
        this.search = this.fb.group({
            Name: [''],
        });
        this.search
            .get('Name')
            ?.valueChanges.pipe(debounceTime(700), distinctUntilChanged())
            .subscribe((text: string) => {
                this.getUserList({ name: text });
            });
    }
    getUserList(query?: any) {
        this.subscriptions.push(
            this.userService.getUserList(query).subscribe((response: any) => {
                if (response?.body?.success) {
                    this.userList = response.body.data;
                    this.dataLoaded = true;
                    this.dataSource = new MatTableDataSource<any>(response.body.data);
                    this.dataSource.paginator = this.paginator;
                }
                this.dataLoaded = true;
            })
        );
    }
    ngOnDestroy(): void {
        for (const element of this.subscriptions) {
            element.unsubscribe();
        }
    }

    createUser() {
        const ref = this.dialog.open(CreateUserModalComponent);
        ref.afterClosed().subscribe((response: any) => {
            if (response === 'success') {
                this.getUserList();
            }
        })
    }
    seeDetails(id: any) {
        this.router.navigate([`profile/${id}`], {
            queryParams: {
                user: 'admin',
            },
            queryParamsHandling: 'merge',
        });
    }
    editUser(id: any) {
        this.router.navigate([`profile/${id}/update`], {
            queryParams: {
                user: 'admin',
            },
            queryParamsHandling: 'merge',
        });
    }
    deleteUser(id: any) {
        const dialogRef = this.dialog.open(UserDeleteConfirmationModalComponent, {
            data: {
                id: id,
                title: 'Course Delete Modal',
            },
        });
        dialogRef.afterClosed().subscribe((res: any) => {
            if (res === 'deleted') {
                this.dataLoaded = false;
                this.getUserList();
            }
        });
    }
    toggleRowExpansion(id: any) {
        this.userList.forEach((user: any) => {
            if (user._id === id) user.isExpanded = !user.isExpanded;
            else user.isExpanded = false;
        });
    }
}
