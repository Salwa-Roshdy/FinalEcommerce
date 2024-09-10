import { NgClass } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Component, inject, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  successMsg: boolean = false;
  msgError: string = '';
  isload: boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
  });
  loginSubmit(): void {
    if (this.loginForm.valid) {
      this._AuthService.setLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message == 'success') {
            this.successMsg = true;

            setInterval(() => {
              localStorage.setItem('Usertoken', res.token);
              this._AuthService.saveUserData();
              this._Router.navigate(['/home']);
            }, 1000);
          }
        },
        error: (err) => {
          console.log(err);
          this.msgError = err.error.message;
          this.isload = false;
        },
      });
    }
  }
}
