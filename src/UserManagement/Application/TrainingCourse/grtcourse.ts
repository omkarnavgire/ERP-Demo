import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TrainingCourse } from '../../Domain/Entities/TrainingCourse';
import { TrainingCourseRepositorySimple } from '../../Infrastructure/Repositories/Trainingcourserepositoriesimpl';
@Injectable({
  providedIn: 'root'
})
export class GetCourse {

  constructor(
    private trainingCourseRepository: TrainingCourseRepositorySimple
  ) {}

  execute(): Observable<TrainingCourse[]> {

    return this.trainingCourseRepository.getTrainingCourses();
  }
}