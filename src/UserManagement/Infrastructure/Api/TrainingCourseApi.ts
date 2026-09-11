import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TrainingCourse} from "../../Domain/Entities/TrainingCourse";
import {Observable} from "rxjs";
import {TrainingCourseRepository} from "../../Domain/Repositories/Traingingcourserepositories";

@Injectable({
    providedIn:"root"
})
export class TrainingCourseApi implements TrainingCourseRepository {
    private readonly apiUrl="/lead-api/TrainingCourse";

    constructor(private http:HttpClient){}

    getTrainingCourses():Observable<TrainingCourse[]> {
        console.log("Training Course GET API:",this.apiUrl);
        return this.http.get<TrainingCourse[]>(this.apiUrl);
    }

    getTrainingCourseById(id:number):Observable<TrainingCourse> {
        console.log("Training Course GET BY ID:",id);
        return this.http.get<TrainingCourse>(`${this.apiUrl}/${id}`);
    }

    createTrainingCourse(trainingCourse:TrainingCourse):Observable<TrainingCourse> {
        console.log("Training Course CREATE API:",trainingCourse);
        return this.http.post<TrainingCourse>(
            `${this.apiUrl}/Create`,
            trainingCourse
        );
    }

    updateTrainingCourse(id:number,trainingCourse:TrainingCourse):Observable<TrainingCourse> {
        console.log("Training Course UPDATE API:",id,trainingCourse);
        return this.http.put<TrainingCourse>(
            `${this.apiUrl}/Update/${id}`,
            trainingCourse
        );
    }

    deleteTrainingCourse(id:number):Observable<void> {
        console.log("Training Course DELETE API:",id);
        return this.http.delete<void>(
            `${this.apiUrl}/Delete/${id}`
        );
    }

    restoreTrainingCourse(id:number):Observable<void> {
        console.log("Training Course RESTORE API:",id);
        return this.http.put<void>(
            `${this.apiUrl}/restore/${id}`,
            {}
        );
    }
}