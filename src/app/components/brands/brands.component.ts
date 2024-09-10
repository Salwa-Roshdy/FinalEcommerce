import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Brands } from '../../core/Interfaces/brands';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit, OnDestroy {
  private readonly _BrandsService = inject(BrandsService);
  brandsList: Brands[] = [];
  specificBrandSubscribe?: Subscription;
  specificBrand: Brands = {} as Brands;
  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res);
        this.brandsList = res.data;

        console.log(this.brandsList);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnDestroy(): void {
    this.specificBrandSubscribe?.unsubscribe();
  }
  getSpecificbrand(brandId: string): void {
    this._BrandsService.getSpecificBrands(brandId).subscribe({
      next: (res) => {
        console.log(res);
        this.specificBrand = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
