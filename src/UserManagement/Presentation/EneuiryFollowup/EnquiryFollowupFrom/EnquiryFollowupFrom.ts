import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-enquiry-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './EnquiryFollowupFrom.html',
  styleUrls: ['./EnquiryFollowupFrom.css']
})
export class Enquiryform implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  enquiryForm!: FormGroup;
  isEditMode = false;
  enquiryId: number | null = null;

  branches: string[] = [
    'Pune',
    'Mumbai',
    'Nashik',
    'Nagpur',
    'Chhatrapati Sambhajinagar'
  ];

  qualifications: string[] = [
    '10th',
    '12th',
    'Diploma',
    'BA',
    'BCA',
    'BCOM',
    'BSC',
    'BE(CSE)',
    'BE(IT)',
    'MCA',
    'MBA',
    'MCS'
  ];

  enquiryForOptions: string[] = [
    'Job Placement',
    'College Project',
    'Upgrade Skill',
    'Other',
    'Real Time Project',
    'AI',
    'Certification',
    '1',
    '3'
  ];

  leadSourceOptions: string[] = [
    'CIIT Student',
    'Website',
    'News Paper',
    'Banner',
    'Call',
    'Online',
    'Email',
    'Other',
    'string',
    'Friend'
  ];

  trainingOptions: string[] = [
    'Ado.Net',
    'Ado.Net,Linq,EF',
    'Advance CSS',
    'Advanced Java',
    'Angular',
    'Angular Ionic',
    'Artificial Intelligence',
    'Asp Dot MVC',
    'Asp Dot Net Core MVC',
    'Asp Dot Net Web Api',
    'Asp Dot Net Web Api Core',
    'Asp.Net Web Form',
    'AWS',
    'Azure',
    'Blazor',
    'Bootstrap',
    'C',
    'C-Sharp',
    'ccorejava',
    'Core Java',
    'Core Java and Manual Testing',
    'CPP',
    'CSS',
    'Data Structure',
    'Java',
    'JavaScript',
    'MySql',
    'Pandas',
    'PowerBI',
    'Python',
    'Sql Server',
    'Testing'
  ];

  ngOnInit(): void {
    this.createForm();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.enquiryId = Number(id);
      this.loadEnquiry(this.enquiryId);
    }
  }

  createForm(): void {
    this.enquiryForm = this.fb.group({
      enquiryDate: [
        this.formatDateForInput(new Date()),
        Validators.required
      ],

      branchName: ['', Validators.required],

      candidateName: [
        '',
        [Validators.required, Validators.minLength(2)]
      ],

      gender: ['', Validators.required],

      localAddress: [''],

      emailAddress: [
        '',
        [Validators.required, Validators.email]
      ],

      mobileNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{10}$/)
        ]
      ],

      birthDate: [''],

      qualification: ['', Validators.required],

      enquiryFor: [[]],

      leadSource: [[]],

      interestedTopics: [[]]
    });
  }

  loadEnquiry(id: number): void {
    /*
      Replace this sample object with:

      this.getEnquiryById.execute(id).subscribe({
        next: (data) => this.patchEnquiry(data),
        error: (error) => console.error(error)
      });
    */

    const sampleEnquiry = {
      
    };

    this.patchEnquiry(sampleEnquiry);
  }

  patchEnquiry(data: any): void {
    this.enquiryForm.patchValue({
      enquiryDate: this.formatDateForInput(data.enquiryDate),
      branchName: data.branchName,
      candidateName: data.candidateName,
      gender: data.gender,
      localAddress: data.localAddress,
      emailAddress: data.emailAddress,
      mobileNumber: data.mobileNumber,
      birthDate: this.formatDateForInput(data.birthDate),
      qualification: data.qualification,
      enquiryFor: this.toArray(data.enquiryFor),
      leadSource: this.toArray(data.leadSource),
      interestedTopics: this.toArray(data.interestedTopics)
    });
  }

  isSelected(controlName: string, item: string): boolean {
    const selected = this.enquiryForm.get(controlName)?.value || [];
    return selected.includes(item);
  }

  toggleSelection(controlName: string, item: string): void {
    const control = this.enquiryForm.get(controlName);

    if (!control) {
      return;
    }

    const current: string[] = [...(control.value || [])];

    if (current.includes(item)) {
      control.setValue(
        current.filter(x => x !== item)
      );
    } else {
      control.setValue([...current, item]);
    }

    control.markAsTouched();
  }

  submit(): void {
    if (this.enquiryForm.invalid) {
      this.enquiryForm.markAllAsTouched();
      return;
    }

    const formValue = this.enquiryForm.value;

    const enquiry = {
      enquiryId: this.enquiryId,
      enquiryDate: formValue.enquiryDate,
      branchName: formValue.branchName,
      candidateName: formValue.candidateName,
      gender: formValue.gender,
      localAddress: formValue.localAddress,
      emailAddress: formValue.emailAddress,
      mobileNumber: formValue.mobileNumber,
      birthDate: formValue.birthDate,
      qualification: formValue.qualification,

     
      enquiryFor: (formValue.enquiryFor || []).join(','),
      leadSource: (formValue.leadSource || []).join(','),
      interestedTopics: (formValue.interestedTopics || []).join(',')
    };

    console.log(
      this.isEditMode ? 'Update Enquiry:' : 'Create Enquiry:',
      enquiry
    );

    /*
      CREATE:
      this.createEnquiry.execute(enquiry).subscribe({
        next: () => this.router.navigate(['/enquiries']),
        error: (error) => console.error(error)
      });

      UPDATE:
      this.updateEnquiry.execute(this.enquiryId!, enquiry).subscribe({
        next: () => this.router.navigate(['/enquiries']),
        error: (error) => console.error(error)
      });
    */

    alert(
      this.isEditMode
        ? 'Enquiry updated successfully!'
        : 'Enquiry created successfully!'
    );

    this.router.navigate(['/main/enquiry']);
  }

  private toArray(value: any): string[] {
    if (Array.isArray(value)) {
      return value;
    }

    if (typeof value === 'string' && value.trim()) {
      return value
        .split(',')
        .map(x => x.trim())
        .filter(x => x);
    }

    return [];
  }

  private formatDateForInput(value: any): string {
    if (!value) {
      return '';
    }

    const date = new Date(value);

    if (isNaN(date.getTime())) {
      return '';
    }

    return date.toISOString().substring(0, 10);
  }
}
