import { Component, OnInit, inject } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/Interfaces/icategory';
import { NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgStyle, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  private readonly _CategoriesService = inject(CategoriesService);
  categoriesList: ICategory[] = [];
  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesList = res.data;
        console.log(this.categoriesList);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getspecificCategory(Id: string): void {}
}
