import { UserData } from './../Interfaces/user-data';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { env } from 'process';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /*   private readonly _HttpClient = inject(HttpClient); */
  constructor(private _HttpClient: HttpClient) {}
  private readonly _Router = inject(Router);
  /*   userData: UserData = {} as UserData;
   */
  userData: any = null;
  userid: string = '';
  setRegisterForm(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/signup`,
      data
    );
  }
  setLoginForm(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/signin`,
      data
    );
  }
  saveUserData(): void {
    if (localStorage.getItem !== null) {
      this.userData = jwtDecode(localStorage.getItem('Usertoken')!);
      this.userid = this.userData.id;
    }
  }
  signOut(): void {
    localStorage.removeItem('Usertoken');
    this.userData = null;
    this._Router.navigate(['/login']);
  }
  verifyEmail(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/forgotPasswords`,
      data
    );
  }
  verifyCode(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/verifyResetCode`,
      data
    );
  }
  verifyResetPassword(data: object): Observable<any> {
    return this._HttpClient.put(
      `${environment.baseUrl}/api/v1/auth/resetPassword`,
      data
    );
  }
}
