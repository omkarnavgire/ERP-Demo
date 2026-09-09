import { Injectable } from "@angular/core";
import { TrainingCourseRepository } from "../../Domain/Repositories/Traingingcourserepositories";
import { TrainingCourseApi } from "../Api/TrainingCourseApi";
import { Observable } from "rxjs";
import { TrainingCourse } from "../../Domain/Entities/TrainingCourse";

@Injectable({
    providedIn:'root'
})
export class TrainingCourseRepositorySimple implements TrainingCourseRepository{
    constructor(
        
        private trainingCourseApi : TrainingCourseApi
    ){}

    getTrainingCourses(): Observable<TrainingCourse[]> {
        return this.trainingCourseApi.getTrainingCourses()
    }

    getTrainingCourseById(id: number): Observable<TrainingCourse> {
        return this.trainingCourseApi.getTrainingCourseById(id);
    }

    createTrainingCourse(trainingCourse: TrainingCourse): Observable<TrainingCourse> {
        return this.trainingCourseApi.createTrainingCourse(trainingCourse);
    }
    updateTrainingCourse(id: number, trainingCourse: TrainingCourse): Observable<TrainingCourse> {
        return this.trainingCourseApi.updateTrainingCourse(id,trainingCourse);
    }

    deleteTrainingCourse(id: number): Observable<void> {
        return this.trainingCourseApi.deleteTrainingCourse(id);
    }
    restoreTrainingCourse(id: number): Observable<void> {
        return this.trainingCourseApi.restoreTrainingCourse(id);
    }


}
