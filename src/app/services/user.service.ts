import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

    isStillAuthentic(): boolean {
        const token = this.localStorage.getToken();
        if (token) {
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

    updateUser(payload: any, id: string, imageFile?: any): Observable<any> {
        if (imageFile) {
            const form = new FormData();
            form.append('image', imageFile);
            return this.http.put<any>(`${this.apiUrl}/update/${id}`, form);
        }
        return this.http.put<any>(`${this.apiUrl}/update/${id}`, payload);
    }

    Logout() {
        this.localStorage.setToken(null);
        this.localStorage.setLoggedInUserData(null);
        this.commonService.userLoggedout.next(true);
    }
    getUserById(id: string | null): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/get-user/${id}`);
    }
    getUserList(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/get-users`);
    }
    getUserData() {
        const token = localStorage.getItem('token');
        if (token) {
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
        let params = new HttpParams();
        if (email) params = params.append('email', email);
        return this.http.get<any>(`${this.apiUrl}/getByEmail`, { observe: 'response', params: { email: email } });
    }
}
