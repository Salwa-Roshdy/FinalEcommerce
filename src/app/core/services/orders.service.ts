import { UserData } from './../Interfaces/user-data';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private readonly _HttpClient: HttpClient) {}
  private readonly _AuthService = inject(AuthService);

  getUserOrders(userId: string): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseUrl}/api/v1/orders/user/${userId}`
    );
  }
  checkout(cartId: string | null, shippingDetails: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${environment.urlServer}`,
      {
        shippingAddress: shippingDetails,
      }
    );
  }
}
