import {Injectable,inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TrainingCourse} from "../../Domain/Entities/TrainingCourse";

@Injectable({
    providedIn:"root"
})
export class TrainingCourseApi{
    private http=inject(HttpClient);
    private readonly apiUrl="/lead-api/TrainingCourse";

    getTrainingCourses():Observable<TrainingCourse[]>{
        console.log("Training Course API: GET all");
        return this.http.get<TrainingCourse[]>(this.apiUrl);
    }

    getTrainingCourseById(id:number):Observable<TrainingCourse>{
        console.log("Training Course API: GET by ID:",id);
        return this.http.get<TrainingCourse>(`${this.apiUrl}/${id}`);
    }

    createTrainingCourse(trainingCourse:TrainingCourse):Observable<TrainingCourse>{
        console.log("Training Course API: CREATE:",trainingCourse);
        return this.http.post<TrainingCourse>(`${this.apiUrl}/Create`,trainingCourse);
    }

    updateTrainingCourse(id:number,trainingCourse:TrainingCourse):Observable<TrainingCourse>{
        console.log("Training Course API: UPDATE:",id,trainingCourse);
        return this.http.put<TrainingCourse>(`${this.apiUrl}/Update/${id}`,trainingCourse);
    }

    deleteTrainingCourse(id:number):Observable<void>{
        console.log("Training Course API: DELETE:",id);
        return this.http.delete<void>(`${this.apiUrl}/Delete/${id}`);
    }

    restoreTrainingCourse(id:number):Observable<void>{
        console.log("Training Course API: RESTORE:",id);
        return this.http.put<void>(`${this.apiUrl}/restore/${id}`,{});
    }
}