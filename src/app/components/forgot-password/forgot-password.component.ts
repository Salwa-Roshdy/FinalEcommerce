import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]{6,}$/),
    ]),
  });
  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
  });
  step: number = 1;
  verifyemailSubmit(): void {
    this._AuthService.verifyEmail(this.verifyEmail.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.statusMsg == 'success') {
          this.step = 2;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  verifyCodeSubmit(): void {
    this._AuthService.verifyCode(this.verifyCode.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.statusMsg == 'success') {
          this.step = 3;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  resetPasswordSubmit(): void {
    let email = this.verifyEmail?.get('email');
    this.resetPassword.get('email')?.patchValue(email);
    this._AuthService.verifyResetPassword(this.resetPassword.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('usertoken', res.token);
        this._AuthService.saveUserData();
        this._Router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
