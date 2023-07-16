import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

    getCourses(query?: any): Observable<any> {
        let queries = new HttpParams();
        if (query) {
            queries = queries.append('courseName', query.courseName);
        }
        return this.http.get<any>(`${this.url}/getCourses`, { observe: 'response', params: queries });
    }
    getCourseById(id: any): Observable<any> {
        return this.http.get<any>(`${this.url}/getCourseById/${id}`);
    }
    updateCourse(Id: string, payload: any): Observable<any> {
        return this.http.put<any>(`${this.url}/updateCourse/${Id}`, payload);
    }
    addCourse(payload: any): Observable<any> {
        return this.http.post<any>(`${this.url}/addCourse`, payload);
    }
    deleteCourse(id: any): Observable<any> {
        return this.http.delete<any>(`${this.url}/deleteCourse/${id}`);
    }
}
