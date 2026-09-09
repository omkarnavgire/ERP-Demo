import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ForgotPassword } from '../../../Application/Account/Forgetpassword';
import { ResetPassword } from '../../../Application/Account/Resetpassword';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './ForgotPassword.html',
  styleUrl: './ForgotPassword.css'
})
export class ForgotPasswordClass {
  private fb = inject(FormBuilder);
  private forgotPasswordUsecase = inject(ForgotPassword);
  private resetPasswordUsecase = inject(ResetPassword);
  private router = inject(Router);

  // Step 1 = email daal ke OTP mangwana, Step 2 = OTP + naya password set karna
  step: 1 | 2 = 1;

  errormessage = '';
  successmessage = '';

  emailForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]]
  });

  resetForm = this.fb.nonNullable.group({
    otp: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  });

  sendOtp(): void {
    this.errormessage = '';
    this.successmessage = '';

    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      return;
    }

    const email = this.emailForm.getRawValue().email;

    this.forgotPasswordUsecase.execute({ email }).subscribe({
      next: () => {
        this.successmessage = 'OTP aapke email par bhej diya gaya hai.';
        this.step = 2;
      },
      error: (error) => {
        this.errormessage = error?.error?.message || 'Email bhejne me error aayi, dobara try karein.';
      }
    });
  }

  resetPassword(): void {
    this.errormessage = '';
    this.successmessage = '';

    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }

    const { otp, newPassword, confirmPassword } = this.resetForm.getRawValue();

    if (newPassword !== confirmPassword) {
      this.errormessage = 'New Password aur Confirm Password match nahi kar rahe.';
      return;
    }

    const email = this.emailForm.getRawValue().email;

    this.resetPasswordUsecase.execute({ email, otp, newPassword, confirmPassword }).subscribe({
      next: () => {
        this.successmessage = 'Password successfully reset ho gaya. Ab login karein.';
        setTimeout(() => this.router.navigate(['/login']), 1200);
      },
      error: (error) => {
        this.errormessage = error?.error?.message || 'Password reset nahi ho paya, dobara try karein.';
      }
    });
  }
}
