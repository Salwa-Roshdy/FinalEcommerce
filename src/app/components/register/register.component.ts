import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  msgError: string = '';
  isload: boolean = false;
  successMsg: boolean = false;
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(9),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\w{6,}$/),
      ]),
      rePassword: new FormControl(null),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    this.confirmPassword
  );
  registerSubmit(): void {
    if (this.registerForm.valid) {
      this.isload = true;
      this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message == 'success') {
            this.successMsg = true;
            setInterval(() => {
              this._Router.navigate(['/login']);
            }, 1000);
          }
          this.isload = false;
        },
        error: (err) => {
          console.log(err);
          this.msgError = err.error.message;
          this.isload = false;
        },
      });
    } else {
      this.registerForm.setErrors({ mismatch: true });
      this.registerForm.markAllAsTouched();
    }
  }

  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value == g.get('rePassword')?.value) {
      return null;
    } else {
      return { mismatch: true };
    }
  }
}
