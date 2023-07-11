import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ExamService {
    examApi = 'http://localhost:3000/examinations';
    constructor(private http: HttpClient) {}

    getUpcommingExaminations(status?: any): Observable<any> {
        let params = new HttpParams();
        if (status) {
            params = params.append('status', status);
        }
        return this.http.get<any>(`${this.examApi}/getExams`, { observe: 'response', params });
    }
    getExamById(id: any): Observable<any> {
        return this.http.get<any>(`${this.examApi}/getExamById/${id}`);
    }
}
