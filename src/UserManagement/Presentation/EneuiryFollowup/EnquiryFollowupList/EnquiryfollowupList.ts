import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

export interface Enquiry {
  enquiryId: number;
  enquiryDate: string ;
  branchName: string;
  candidateName: string;
  gender: string;
  localAddress: string;
  emailAddress: string;
  mobileNumber: string;
  birthDate: string ;
  qualification: string;
  enquiryFor: string;
  leadSource: string;
  interestedTopics: string;
  deletedAt?: Date ;
}

@Component({
  selector: 'app-enquiry-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './EnquiryFollowupList.html',
  styleUrls: ['./EnquiryFollowupList.css']
})
export class Enquirylist implements OnInit {

  private router = inject(Router);

  enquiries: Enquiry[] = [];
  filteredEnquiries: Enquiry[] = [];

  selectedBranch = '';

  branches: string[] = [
    'Pune',
    'Mumbai',
    'Nashik',
    'Nagpur',
    'Chhatrapati Sambhajinagar'
  ];

  ngOnInit(): void {
    this.loadEnquiries();
  }

  loadEnquiries(): void {
 
    this.filteredEnquiries = [...this.enquiries];
  }

  filterEnquiries(): void {
    if (!this.selectedBranch) {
      this.filteredEnquiries = [...this.enquiries];
      return;
    }

    this.filteredEnquiries = this.enquiries.filter(
      x => x.branchName === this.selectedBranch
    );
  }

  newEnquiry(): void {
    this.router.navigate(['/main/enquiry/add']);
  }

  editEnquiry(enquiry: Enquiry): void {
    this.router.navigate(['/main/enquiry/edit', enquiry.enquiryId]);
  }

  deleteEnquiry(enquiry: Enquiry): void {
    if (!confirm(`Delete enquiry for ${enquiry.candidateName}?`)) {
      return;
    }

    // Replace this with your DeleteEnquiry use case.
    this.enquiries = this.enquiries.filter(
      x => x.enquiryId !== enquiry.enquiryId
    );

    this.filterEnquiries();
  }

  restoreEnquiry(enquiry: Enquiry): void {
    // Replace this with your RestoreEnquiry use case.
    enquiry.deletedAt ;
   
    this.filterEnquiries();
  }
}
