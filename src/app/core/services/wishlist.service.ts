import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { IProduct } from '../Interfaces/iproduct';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private _HttpClient: HttpClient) {}

  AddToWishlist(id: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`, {
      productId: id,
    });
  }

  getProductsWishlist(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`);
  }

  removeSpecificItem(ItemID: string): Observable<any> {
    return this._HttpClient.delete(
      `${environment.baseUrl}/api/v1/wishlist/${ItemID}`
    );
  }
}
