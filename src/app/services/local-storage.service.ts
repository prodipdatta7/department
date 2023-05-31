import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    constructor() {}

    setToken(value: any) {
        if (value === null) localStorage.removeItem('token');
        else localStorage.setItem('token', JSON.stringify(value));
    }
    getToken() {
        return localStorage.getItem('token');
    }
    setLoggedInUserData(data: any) {
        if (data === null) localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(data));
    }
    getLoggedInUserData() {
        return localStorage.getItem('user');
    }
}
