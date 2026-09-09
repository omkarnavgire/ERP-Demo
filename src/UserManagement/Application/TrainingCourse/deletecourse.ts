import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TrainingCourseRepositorySimple } from '../../Infrastructure/Repositories/Trainingcourserepositoriesimpl';

@Injectable({
  providedIn: 'root'
})
export class DeleteCourse {

  constructor(
    private trainingCourseRepository: TrainingCourseRepositorySimple
  ) {}

  execute(id: number): Observable<void> {

    return this.trainingCourseRepository.deleteTrainingCourse(id);
  }
}