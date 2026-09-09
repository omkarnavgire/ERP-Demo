import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export interface FeeStructureRow {
  srNo: number;
  feeMode: string;
  feeAmount: number;
  gst: number;
  totalInstallments: number;
}

export interface TrainingCourse {
  courseId: number;
  courseName: string;
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

  courseForm!: FormGroup;
  feeRowForm!: FormGroup;

  feeModes: string[] = ['One Time', 'Installments', 'EMI', 'Cash', 'Online'];

  feeRows: FeeStructureRow[] = [];

  courses: TrainingCourse[] = [

  ];

  ngOnInit(): void {
    this.createForms();
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

  // Add a fee-structure row to the table using the "+" button
  addFeeRow(): void {
    if (this.feeRowForm.invalid) {
      this.feeRowForm.markAllAsTouched();
      return;
    }

    const value = this.feeRowForm.value;

    const row: FeeStructureRow = {
      srNo: this.feeRows.length + 1,
      feeMode: value.feeMode,
      feeAmount: value.feeAmount,
      gst: value.gst ?? 0,
      totalInstallments: value.installments
    };

    this.feeRows.push(row);

    this.feeRowForm.reset();
  }

  removeFeeRow(row: FeeStructureRow): void {
    this.feeRows = this.feeRows
      .filter(x => x !== row)
      .map((x, i) => ({ ...x, srNo: i + 1 }));
  }

  // Submit the whole Training Course Form
  submit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }

    if (this.feeRows.length === 0) {
      alert('Please add at least one fee structure row.');
      return;
    }

    const newCourse: TrainingCourse = {
      courseId: this.courses.length
        ? Math.max(...this.courses.map(c => c.courseId)) + 1
        : 1,
      courseName: this.courseForm.value.courseName,
      feeStructure: [...this.feeRows]
    };

    /*
      Replace this with your actual use case:

      this.addTrainingCourse.execute(newCourse).subscribe({
        next: () => this.loadCourses(),
        error: (error) => console.error(error)
      });
    */

    this.courses.push(newCourse);

    // Reset the form for the next entry
    this.courseForm.reset();
    this.feeRows = [];

    alert('Training course saved successfully!');
  }

  toggleExpand(course: TrainingCourse): void {
    course.expanded = !course.expanded;
  }

  deleteCourse(course: TrainingCourse): void {
    if (!confirm(`Delete course "${course.courseName}"?`)) {
      return;
    }

    /*
      Replace this with your actual use case:

      this.deleteTrainingCourse.execute(course.courseId).subscribe({
        next: () => this.loadCourses(),
        error: (error) => console.error(error)
      });
    */

    this.courses = this.courses.filter(x => x.courseId !== course.courseId);
  }
}
