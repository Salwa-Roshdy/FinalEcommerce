import { CategoriesService } from './../../core/services/categories.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { ICategory } from '../../core/Interfaces/icategory';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css',
})
export class CategoryDetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _CategoriesService = inject(CategoriesService);

  category: ICategory | null = null;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        let categoryID = p.get('categoryID');
        this._CategoriesService.getSpecificCategory(categoryID).subscribe({
          next: (res) => {
            this.category = res.data;
            console.log(this.category);
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
    });
  }
}
