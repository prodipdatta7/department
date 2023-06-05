import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

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
    columnDefs = [
        { field: '_id', label: '', filter: false, sortable: false, type: 'search', width: null },
        { field: 'studentId', label: 'ID', filter: false, sortable: true, type: null, width: null },
        { field: 'name', label: 'Name', filter: true, sortable: true, type: null, width: '100px' },
        { field: 'email', label: 'Email', filter: true, sortable: true, type: null, width: '200px' },
        { field: 'phone', label: 'Phone', filter: true, sortable: true, type: null, width: '100px' },
        { field: 'department', label: 'Dept.', filter: true, sortable: true, type: null, width: '100px' },
        { field: 'address', label: 'Address', filter: true, sortable: true, type: null, width: '100px' },
        { field: 'isAdmin', label: 'isAdmin', filter: false, sortable: false, type: null, width: '100px' },
    ];
    columnSearchDefs: any = [];
    displayedColumns: any = [];
    displayedSearchColumns: any = [];
    searchedData: any;
    orderByData: any;
    constructor(private userService: UserService, private router: Router) {}
    @ViewChild('paginator') paginator!: MatPaginator;
    ngOnInit(): void {
        this.columnDefs.forEach((column) => {
            this.displayedColumns.push(column.field);
        });
        this.getUserList();
    }
    ngAfterViewInit() {
        this.dataSource = new MatTableDataSource<any>(this.userList);
        this.dataSource.paginator = this.paginator;
        this.dataLoaded = true;
    }
    getUserList() {
        this.subscriptions.push(
            this.userService.getUserList().subscribe((response: any) => {
                if (response && response.success) {
                    this.userList = response.data;
                    this.dataLoaded = true;
                    this.dataSource = new MatTableDataSource<any>(response.data);
                    this.dataSource.paginator = this.paginator;
                }
            })
        );
    }
    announceSortChange(event: any) {
        this.orderByData = {
            OrderByField: event.active,
            Ascending: event.direction === 'asc',
        };
        this.getUserList();
    }
    ngOnDestroy(): void {
        for (const element of this.subscriptions) {
            element.unsubscribe();
        }
    }
    getRowData(user: any) {
        console.log(user);
        this.router.navigate(['admin' + `/user/${user._id}`]);
    }
}
