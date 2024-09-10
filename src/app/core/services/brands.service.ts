import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private readonly _HttpClient: HttpClient) {}
  getAllBrands(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/brands`);
  }
  getSpecificBrands(brandId: string): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseUrl}/api/v1/brands/${brandId}`
    );
  }
}
