import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}
  CartCount: number = 0;
  AddToCart(productID: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`, {
      productId: productID,
    });
  }
  getProductsCart(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`);
  }

  removeSpecificItem(ItemID: string): Observable<any> {
    return this._HttpClient.delete(
      `${environment.baseUrl}/api/v1/cart/${ItemID}`
    );
  }
  updateProductQuantity(ItemID: string, Count: number): Observable<any> {
    return this._HttpClient.put(
      `${environment.baseUrl}/api/v1/cart/${ItemID}`,

      {
        count: Count,
      }
    );
  }
  ClearUserCart(): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`);
  }
}
