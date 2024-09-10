import { Wishlist } from './../../core/Interfaces/wishlist';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavBlankComponent } from '../nav-blank/nav-blank.component';
import { ProductService } from '../../core/services/product.service';
import { Init } from 'v8';
import { IProduct } from '../../core/Interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/Interfaces/icategory';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgClass } from '@angular/common';
import { SalePipe } from '../../core/pipes/sale.pipe';
import { TermSplitPipe } from '../../core/pipes/term-split.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { Icart } from '../../core/Interfaces/icart';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavBlankComponent,
    FormsModule,
    CarouselModule,
    RouterLink,
    CurrencyPipe,
    SalePipe,
    TermSplitPipe,
    SearchPipe,
    NgClass,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly _ProductService = inject(ProductService);
  private readonly _CategoriesService = inject(CategoriesService);
  readonly _CartService = inject(CartService);
  private _ToastrService = inject(ToastrService);
  private _NgxSpinnerService = inject(NgxSpinnerService);
  private _WishlistService = inject(WishlistService);

  ProductsWishes: string[] = [];
  getAllProductSubscribe!: Subscription;
  getAllcategoriesSubscribe!: Subscription;
  productList: IProduct[] = [];
  categoriesList: ICategory[] = [];
  wishList: Wishlist[] = [];
  cartItems: Icart[] = [];
  temSearch: string = '';

  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navSpeed: 700,
    rtl: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };
  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    rtl: true,
    navText: ['', ''],
    items: 1,
    nav: true,
  };

  ngOnInit(): void {
    this.getAllProductSubscribe = this._ProductService
      .getAllProduct()
      .subscribe({
        next: (res) => {
          this.productList = res.data;
          console.log(this.productList);
        },
      });

    this.getAllcategoriesSubscribe = this._CategoriesService
      .getAllCategories()
      .subscribe({
        next: (res) => {
          this.categoriesList = res.data;
          /*  console.log(this.categoriesList); */
        },
      });

    this._WishlistService.getProductsWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.wishList = res.data;
        console.log(this.wishList);
      },
    });
  }
  ngOnDestroy(): void {
    this.getAllProductSubscribe?.unsubscribe();
    this.getAllcategoriesSubscribe?.unsubscribe();
  }
  AddToCart(productID: string): void {
    this._CartService.AddToCart(productID).subscribe({
      next: (res) => {
        console.log(res.message);

        this._CartService.CartCount = res.numOfCartItems;
        console.log(res);

        this._ToastrService.success(res.message, 'Fresh Cart');
      },
    });
  }
  getWishList(): void {
    this._WishlistService.getProductsWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.wishList = res.data;
        console.log(this.wishList);
      },
    });
  }
  AddToWishList(id: string): void {
    this._WishlistService.AddToWishlist(id).subscribe({
      next: (res) => {
        console.log(res.message);

        this.wishList = res.data;
        console.log('wish updated', res.data);

        /*  console.log('pid' + productID); */
        this.getWishList();
        this._ToastrService.success(res.message, 'Fresh Cart');
      },
    });
  }
  toggleWishlist(product: IProduct): void {
    if (this.inwishlist(product)) {
      /*     console.log('inwishlist', this.inwishlist(product)); */
      this.removeFromWishlist(product._id);
    } else {
      this.AddToWishList(product._id);
    }
  }

  inwishlist(product: IProduct): boolean {
    return this.wishList.some((item) => item._id == product._id);
  }

  removeFromWishlist(productId: string): void {
    this._WishlistService.removeSpecificItem(productId).subscribe({
      next: (res) => {
        console.log(res.message);
        console.log(res);
        this.wishList = res.data;
        this.getWishList();
        /*  console.log('pid' + productID); */
        this._ToastrService.success(res.message, 'Fresh Cart');
      },
    });
  }
}
