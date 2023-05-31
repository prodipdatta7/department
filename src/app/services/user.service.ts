import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    apiUrl = 'http://localhost:3000/users';
    httpOptions = {
        headers: new HttpHeaders({
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient, private localStorage: LocalStorageService, private commonService: CommonService) {}

    isStillAuthentic(): Boolean {
        const token = this.localStorage.getToken();
        if (Boolean(token)) {
            const parsedToken = this.parseJwt(token);
            if (!this._tokenExpired(parsedToken.exp)) {
                return true;
            }
        }
        return false;
    }

    Register(payload: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/register`, payload, this.httpOptions);
    }

    Login(payload: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, payload, this.httpOptions);
    }

    Logout() {
        this.localStorage.setToken(null);
        this.localStorage.setLoggedInUserData(null);
        this.commonService.userLoggedout.next(true);
    }
    getUserList(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/get-users`);
    }
    getUserData() {
        const token = localStorage.getItem('token');
        if (Boolean(token)) {
            const parsedToken = this.parseJwt(token);
            if (!this._tokenExpired(parsedToken.exp)) {
                const rawData = localStorage.getItem('user');
                if (rawData) {
                    return JSON.parse(rawData);
                }
            }
        }
        return {};
    }
    private _tokenExpired(expiration: any): boolean {
        return Math.floor(new Date().getTime() / 1000) >= expiration;
    }
    private parseJwt(token: any) {
        if (!token) return;
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            window
                .atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );

        return JSON.parse(jsonPayload);
    }

    getUserByEmail(email: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/get-by-email`, { email: email }, this.httpOptions);
    }
}
