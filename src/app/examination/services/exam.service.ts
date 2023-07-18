import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ExamService {
    examApi = 'http://localhost:3000/examinations';
    ExamNameMapping : any = {
        '1-1': {
            year: '1st',
            semester: '1st'
        },
        '1-2': {
            year: '1st',
            semester: '2nd'
        },
        '2-1': {
            year: '2nd',
            semester: '1st'
        },
        '2-2': {
            year: '2nd',
            semester: '2nd'
        },
        '3-1': {
            year: '3rd',
            semester: '1st'
        },
        '3-2': {
            year: '3rd',
            semester: '2nd'
        },
        '4-1': {
            year: '4th',
            semester: '1st'
        },
        '4-2': {
            year: '4th',
            semester: '2nd'
        },
    };
    constructor(private http: HttpClient) {}

    getUpcommingExaminations(query?: any, status?:any): Observable<any> {
        let queries = new HttpParams();
        if (query) {
            queries = queries.append('examName', query.examName);
        }
        if(status) {
            queries = queries.append('status', status);
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

    registerUser(payload: any, examId: string): Observable<any> {
        return this.http.put<any>(`${this.examApi}/register/${examId}`, payload);
    }

    getDocuments(payload: any) : Observable<any> {
        return this.http.post<any>(`${this.examApi}/getDocuments`, payload);
    }
}
