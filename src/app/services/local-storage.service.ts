import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    constructor() {}

    setToken(value: any) {
        localStorage.setItem('token', JSON.stringify(value));
    }
    getToken() {
        return localStorage.getItem('token');
    }
    setLoggedInUserData(data: any) {
        localStorage.setItem('user', JSON.stringify(data));
    }
    getLoggedInUserData() {
        return localStorage.getItem('user');
    }
}
