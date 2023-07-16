import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ExamService {
    examApi = 'http://localhost:3000/examinations';
    constructor(private http: HttpClient) {}

    getUpcommingExaminations(query?: any): Observable<any> {
        let queries = new HttpParams();
        if (query) {
            queries = queries.append('examName', query.examName);
        }
        return this.http.get<any>(`${this.examApi}/getExams`, { observe: 'response', params: queries });
    }
    getExamById(id: any): Observable<any> {
        return this.http.get<any>(`${this.examApi}/getExamById/${id}`);
    }
    deleteById(id: any): Observable<any> {
        return this.http.delete<any>(`${this.examApi}/remove/${id}`);
    }
    createExam(payload: any): Observable<any> {
        return this.http.post<any>(`${this.examApi}/createExam`, payload);
    }
    updateExam(payload: any, Id: any): Observable<any> {
        return this.http.put<any>(`${this.examApi}/updateExam/${Id}`, payload);
    }
}
