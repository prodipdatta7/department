import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
    dataSource: any = [];
    columnDefs = [
        { field: 'firstName', label: 'First Name', filter: true, sortable: true, type: null },
        { field: 'lastName', label: 'Last Name', filter: true, sortable: true, type: null },
        { field: 'email', label: 'Email', filter: true, sortable: true, type: null },
        { field: 'city', label: 'City', filter: true, sortable: true, type: null },
        { field: 'zip', label: 'Zip', filter: true, sortable: true, type: null },
        { field: 'street', label: 'Street', filter: true, sortable: true, type: null },
        { field: 'apartment', label: 'Apartment', filter: true, sortable: true, type: null },
        { field: 'division', label: 'Division', filter: true, sortable: true, type: null },
        { field: 'country', label: 'Country', filter: true, sortable: true, type: null },
        { field: 'isAdmin', label: 'isAdmin', filter: false, sortable: false, type: 'role' },
    ];
    columnSearchDefs: any = [];
    displayedColumns: any = [];
    displayedSearchColumns: any = [];
    searchedData: any;
    orderByData: any;
    constructor(private userService: UserService) {}
    ngOnInit(): void {
        this.getUserList();
        this.columnDefs.forEach((column) => {
            const clmn = JSON.parse(JSON.stringify(column));
            clmn.field = clmn.field + '_filter';
            clmn['input'] = new FormControl({ value: '', disabled: !clmn.filter });
            if (clmn.filter) {
                this.setAndSubscribe(clmn);
            }
            this.columnSearchDefs.push(clmn);
            this.displayedColumns.push(column.field);
            this.displayedSearchColumns.push(clmn.field);
        });
    }
    setAndSubscribe(column: any) {
        column['subscription'] = column.input.valueChanges.pipe(debounceTime(700), distinctUntilChanged()).subscribe((value: any) => {
            console.log(`column: ${column.field}`, value);
            const field = column.field.split('_')[0];
            const index = this.searchedData.findIndex((f: any) => f.FieldName === field);
            if (index > -1) {
                this.searchedData.splice(index, 1);
            }
            if (value.trim()) {
                this.searchedData.push({
                    FieldName: field,
                    Value: value,
                });
            }
            this.dataSource.length = 0;
            this.getUserList();
        });
    }

    getUserList() {
        this.subscriptions.push(
            this.userService.getUserList().subscribe((response: any) => {
                if (response && response.success) {
                    this.userList = response.data;
                    this.prepareModel();
                    console.log(this.userList);
                }
            })
        );
    }
    prepareModel() {
        this.dataSource = [];
        for (const element of this.userList) {
            const model = {
                firstName: element['firstName'],
                lastName: element['lastName'],
                email: element['email'],
                city: element['city'],
                zip: element['zip'],
                apartment: element['apartment'],
                street: element['street'],
                division: element['division'],
                country: element['country'],
                isAdmin: element['isAdmin'],
            };
            this.dataSource.push(model);
        }
        console.log(this.dataSource);
    }
    announceSortChange(event: any) {
        this.orderByData = {
            OrderByField: event.active,
            Ascending: event.direction === 'asc',
        };
        this.dataSource.length = 0;
        this.getUserList();
    }
    ngOnDestroy(): void {
        for (const element of this.subscriptions) {
            element.unsubscribe();
        }
    }
}
