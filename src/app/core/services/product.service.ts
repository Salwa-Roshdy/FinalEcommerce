import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _HttpClient: HttpClient) {}

  getAllProduct(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products`);
  }
  getSpecificProducts(id: string | null): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products/${id}`);
  }
}
