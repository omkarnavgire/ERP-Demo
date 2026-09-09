import { Injectable } from "@angular/core";
//import { TrainingCourseRepository } from "../../Domain/Repositories/Traingingcourserepositories";
import { HttpClient } from "@angular/common/http";
import { TrainingCourse } from "../../Domain/Entities/TrainingCourse";
import { Observable } from "rxjs";
import { TrainingCourseRepository } from "../../Domain/Repositories/Traingingcourserepositories";

@Injectable({
    providedIn:'root'
})
export class TrainingCourseApi implements TrainingCourseRepository {
    private apiUrl = 'https://leadapis.ciitstudent.com/api/TrainingCourse';

    constructor(private http: HttpClient){}

    getTrainingCourses(): Observable<TrainingCourse[]> {
        return this.http.get<TrainingCourse[]>(this.apiUrl);
    }

    getTrainingCourseById(id: number): Observable<TrainingCourse> {
        return this.http.get<TrainingCourse>(`${this.apiUrl}/${id}`);
    }

    createTrainingCourse(trainingCourse: TrainingCourse): Observable<TrainingCourse> {
        return this.http.post<TrainingCourse>(
            this.apiUrl,
            trainingCourse
        );
    }
    updateTrainingCourse(id: number, trainingCourse: TrainingCourse): Observable<TrainingCourse> {
        return this.http.put<TrainingCourse>(
            `${this.apiUrl}/${id}`,
            trainingCourse
        )
    }
    deleteTrainingCourse(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    restoreTrainingCourse(id: number): Observable<void> {
        return this.http.put<void>(
            `${this.apiUrl}/restore/${id}`,{}
        );
    }

}