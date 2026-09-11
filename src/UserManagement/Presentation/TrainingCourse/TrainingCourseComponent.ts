import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TrainingCourse as TrainingCourseEntity } from '../../Domain/Entities/TrainingCourse';
import { GetCourse } from '../../Application/TrainingCourse/grtcourse';
import { CreateCourse } from '../../Application/TrainingCourse/createcourse';
import { UpdateCourse } from '../../Application/TrainingCourse/updatecourse';
import { DeleteCourse } from '../../Application/TrainingCourse/deletecourse';
import { RestoreCourse } from '../../Application/TrainingCourse/restorecourse';

export interface FeeStructureRow {
  srNo: number;
  feeMode: string;
  feeAmount: number;
  gst: number;
  totalInstallments: number;
}

interface TrainingCourseViewModel extends TrainingCourseEntity {
  feeStructure: FeeStructureRow[];
  expanded?: boolean;
}

@Component({
  selector: 'app-training-course',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './TrainingCourse.html',
  styleUrls: ['./TrainingCourse.css']
})
export class TrainingCourseComponent implements OnInit {
  private fb = inject(FormBuilder);
  private getCourse = inject(GetCourse);
  private createCourse = inject(CreateCourse);
  private updateCourse = inject(UpdateCourse);
  private deleteCourseUseCase = inject(DeleteCourse);
  private restoreCourseUseCase = inject(RestoreCourse);

  courseForm!: FormGroup;
  feeRowForm!: FormGroup;

  feeModes: string[] = [
    'One Time',
    'Installments',
    'EMI',
    'Cash',
    'Online'
  ];

  feeRows: FeeStructureRow[] = [];
  courses: TrainingCourseViewModel[] = [];
  loading = false;

  ngOnInit(): void {
    this.createForms();
    this.loadCourses();
  }

  createForms(): void {
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required]
    });

    this.feeRowForm = this.fb.group({
      feeMode: ['', Validators.required],
      feeAmount: [null, [Validators.required, Validators.min(0)]],
      gst: [null, [Validators.min(0)]],
      installments: [null, [Validators.required, Validators.min(1)]]
    });
  }

  loadCourses(): void {
    this.loading = true;

    this.getCourse.execute().subscribe({
      next: (response) => {
        console.log('Training Courses API Response:', response);

        this.courses = response.map(course => ({
          ...course,
          feeStructure: [],
          expanded: false
        }));

        this.loading = false;
      },
      error: (error) => {
        console.error('Training Courses Load Error:', error);
        this.loading = false;
      }
    });
  }

  addFeeRow(): void {
    if (this.feeRowForm.invalid) {
      this.feeRowForm.markAllAsTouched();
      return;
    }

    const value = this.feeRowForm.value;

    const row: FeeStructureRow = {
      srNo: this.feeRows.length + 1,
      feeMode: value.feeMode,
      feeAmount: Number(value.feeAmount),
      gst: Number(value.gst ?? 0),
      totalInstallments: Number(value.installments)
    };

    this.feeRows.push(row);

    console.log('Fee Structure Row Added:', row);

    this.feeRowForm.reset();
  }

  removeFeeRow(row: FeeStructureRow): void {
    this.feeRows = this.feeRows
      .filter(x => x !== row)
      .map((x, index) => ({
        ...x,
        srNo: index + 1
      }));

    console.log('Fee Structure Row Removed:', row);
  }

  submit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }

    if (this.feeRows.length === 0) {
      alert('Please add at least one fee structure row.');
      return;
    }

    const feesAmount = this.feeRows.reduce(
      (total, row) => total + Number(row.feeAmount || 0),
      0
    );

    const course: TrainingCourseEntity = {
      courseId: 0,
      courseName: this.courseForm.value.courseName,
      feesAmount: feesAmount,
      feesChangeDate: null,
      installmentPercentage: null
    };

    console.log('Create Training Course Payload:', course);

    this.createCourse.execute(course).subscribe({
      next: (response) => {
        console.log('Create Training Course Response:', response);

        alert('Training course saved successfully.');

        this.courseForm.reset();
        this.feeRowForm.reset();
        this.feeRows = [];

        this.loadCourses();
      },
      error: (error) => {
        console.error('Create Training Course Error:', error);
        alert('Failed to save training course.');
      }
    });
  }

  toggleExpand(course: TrainingCourseViewModel): void {
    course.expanded = !course.expanded;
  }

  deleteCourse(course: TrainingCourseViewModel): void {
    if (!confirm(`Delete course "${course.courseName}"?`)) {
      return;
    }

    console.log('Delete Training Course ID:', course.courseId);

    this.deleteCourseUseCase.execute(course.courseId).subscribe({
      next: () => {
        console.log('Training Course Deleted Successfully');

        alert('Training course deleted successfully.');

        this.loadCourses();
      },
      error: (error) => {
        console.error('Delete Training Course Error:', error);

        alert('Failed to delete training course.');
      }
    });
  }

  restoreCourse(course: TrainingCourseViewModel): void {
    console.log('Restore Training Course ID:', course.courseId);

    this.restoreCourseUseCase.execute(course.courseId).subscribe({
      next: () => {
        console.log('Training Course Restored Successfully');

        alert('Training course restored successfully.');

        this.loadCourses();
      },
      error: (error) => {
        console.error('Restore Training Course Error:', error);

        alert('Failed to restore training course.');
      }
    });
  }

  updateCourseData(
    course: TrainingCourseViewModel
  ): void {
    console.log('Update Training Course:', course);

    this.updateCourse.execute(
      course.courseId,
      course
    ).subscribe({
      next: (response) => {
        console.log('Update Training Course Response:', response);

        alert('Training course updated successfully.');

        this.loadCourses();
      },
      error: (error) => {
        console.error('Update Training Course Error:', error);

        alert('Failed to update training course.');
      }
    });
  }
}