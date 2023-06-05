import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AdminSpecificService {
    url = 'http://localhost:3000/courses';
    httpOptions = {
        headers: new HttpHeaders({
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getCourses(): Observable<any> {
        return this.http.get<any>(`${this.url}/getCourses`);
    }
    updateCourse(Id: string, payload: any): Observable<any> {
        return this.http.put<any>(`${this.url}/updateCourse/${Id}`, payload);
    }
    addCourse(payload: any): Observable<any> {
        return this.http.post<any>(`${this.url}/addCourse`, payload);
    }
}
